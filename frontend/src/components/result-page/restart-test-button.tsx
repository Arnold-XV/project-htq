"use client";

import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { RefreshCcw } from "lucide-react";

export default function RestartTest() {
  const router = useRouter();
  function handleClick() {
    try {
      localStorage.removeItem("lastResultPayload");
      localStorage.removeItem("htq-answers");
      localStorage.removeItem("quizResultId");
      localStorage.removeItem("anonUserId");
      localStorage.removeItem("branchCategory");
      localStorage.removeItem("lastTieBreakerQuestions");
      localStorage.removeItem("lastTieBreakerParams");
    } catch {}
    router.push("/test/1");
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  }
  return (
    <Button
      onClick={handleClick}
      className="shadow-xs bg-neutral-100 text-neutral-900 font-bold text-[14px] !px-3.5 py-2"
    >
      <RefreshCcw />
      <p>Ulangi Test</p>
    </Button>
  );
}
