import { StreamTransciptItem } from "@/modules/meetings/types";
import { inngest } from "./client";
import JSONL from "jsonl-parse-stringify";
import { db } from "@/db";
import { agents, meetings, user } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";

// Hugging Face Summarizer
async function summarizeWithHuggingFace(text: string): Promise<string> {
  const HF_API_TOKEN = process.env.HF_API_TOKEN;
  if (!HF_API_TOKEN) {
    throw new Error("Missing HF_API_TOKEN in environment variables.");
  }

  const response = await fetch(
    "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: text }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Hugging Face API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data?.[0]?.summary_text ?? "No summary available.";
}

export const meetingsProcessing = inngest.createFunction(
  { id: "meetings/processing" },
  { event: "meetings/processing" },
  async ({ event, step }) => {
    const { transcriptUrl, meetingId } = event.data;

    if (!transcriptUrl || !meetingId) {
      throw new Error("Missing transcriptUrl or meetingId in event data.");
    }

    const response = await step.fetch(transcriptUrl, {
      method: "GET",
    });

    const transcript = await step.run("parse-transcript", async () => {
      const text = await response.text();
      try {
        return JSONL.parse<StreamTransciptItem>(text);
      } catch  {
        throw new Error("Failed to parse transcript JSONL.");
      }
    });

    const transcriptWithSpeakers = await step.run("add-speakers", async () => {
      const speakerIds = [...new Set(transcript.map((item) => item.speaker_id))];

      const [userSpeakers, agentSpeakers] = await Promise.all([
        db.select().from(user).where(inArray(user.id, speakerIds)),
        db.select().from(agents).where(inArray(agents.id, speakerIds)),
      ]);

      const speakers = [...userSpeakers, ...agentSpeakers];

      return transcript.map((item) => {
        const speaker = speakers.find((s) => s.id === item.speaker_id);
        return {
          ...item,
          user: {
            name: speaker?.name ?? "Unknown",
          },
        };
      });
    });

    const summaryText = await step.run("summarize-transcript", async () => {
      const plainText = transcriptWithSpeakers
        .map((item) => `${item.user.name}: ${item.text}`)
        .join("\n");

      const input = plainText.slice(0, 3000); // Hugging Face token limitation
      return await summarizeWithHuggingFace(input);
    });

    await step.run("save-summary", async () => {
      await db
        .update(meetings)
        .set({
          summary: summaryText,
          status: "completed",
        })
        .where(eq(meetings.id, meetingId));
    });
  }
);
