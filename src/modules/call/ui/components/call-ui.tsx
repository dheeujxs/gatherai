import { StreamTheme, useCall } from "@stream-io/video-react-sdk";
import { useState, useRef } from "react";
import { CallLobby } from "./call-lobby";
import { CallActive } from "./call-active";
import { CallEnded } from "./call-ended";

interface Props {
  meetingName: string;
}

export const CallUI = ({ meetingName }: Props) => {
  const call = useCall();
  const [show, setShow] = useState<"lobby" | "call" | "ended">("lobby");
  const hasJoinedRef = useRef(false); // 👈 Prevent duplicate joins

  const handleJoin = async () => {
    if (!call || hasJoinedRef.current) return;

    try {
      hasJoinedRef.current = true;
      await call.join(); // ✅ Will only be called once
      setShow("call");
    } catch (error) {
      console.error("Error joining call:", error);
      hasJoinedRef.current = false; // reset if failed
    }
  };

  const handleLeave = async () => {
    if (!call) return;

    try {
      await call.endCall();
    } catch (error) {
      console.error("Error ending call:", error);
    } finally {
      setShow("ended");
      hasJoinedRef.current = false; // reset for future calls
    }
  };

  return (
    <StreamTheme className="h-full">
      {show === "lobby" && <CallLobby onJoin={handleJoin} />}
      {show === "call" && (
        <CallActive onLeave={handleLeave} meetingName={meetingName} />
      )}
      {show === "ended" && <CallEnded />}
    </StreamTheme>
  );
};
