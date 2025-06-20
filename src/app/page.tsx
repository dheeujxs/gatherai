import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/shared/Header";

export default function LandingPage() {
  return (
    <div className="flex flex-col pt-16">
        <Header/>
      {/* ───── Hero ───── */}
      <section className="mt-20 pb-12 space-y-10 md:space-y-15 px-5">
        <div className="container mx-auto px-4 md:px-6 text-center space-y-6">
          <Badge variant="outline" className="bg-green-100 text-green-700">
            Gather with your AI agent. Face to face.
          </Badge>

          <h1
            className="mx-auto max-w-6xl text-4xl font-black tracking-tight md:text-8xl"
            style={{
              background: "linear-gradient(to right, #16a34a, #22c55e, #4ade80)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "1px 1px 1px rgba(0,0,0,0.05)",
              letterSpacing: "-0.02em",
            }}
          >
            Gather with AI. Talk. Ask. Decide.
          </h1>

          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed">
            Join real-time video gatherings with your personal AI agent — get answers, plan your day, or just talk it out.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row justify-center">
            <Button
              asChild
              size="lg"
              className="bg-green-600 hover:bg-green-700"
            >
              <Link href="/dashboard">
                Start a Gathering
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-green-600 text-green-600 hover:bg-green-50"
            >
              <Link href="#how-it-works">See How It Works</Link>
            </Button>
          </div>
        </div>

        <div className="container mx-auto max-w-5xl overflow-hidden rounded-xl shadow-xl">
          <div className="gradient p-1 aspect-[16/9]">
            {/* Video preview or hero animation area */}
          </div>
        </div>
      </section>
    </div>
  );
}
