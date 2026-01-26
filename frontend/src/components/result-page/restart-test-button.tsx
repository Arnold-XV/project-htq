"use client";

import React from "react";
import { Button } from "../ui/button";
import { RefreshCcw } from "lucide-react";

export default function RestartTest() {
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
    window.location.href = "/test/1";
  }
  return (
    <Button
      onClick={handleClick}
      className="shadow-xs bg-neutral-100 text-neutral-900 font-bold text-[14px] !px-3.5 py-2 hover:scale-105 rounded-[8px]"
    >
      <RefreshCcw />
      <p>Ulangi Test</p>
    </Button>
  );
}
