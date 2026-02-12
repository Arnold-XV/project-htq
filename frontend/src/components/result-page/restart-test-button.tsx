"use client";

import React from "react";
import { Button } from "../ui/button";
import { RefreshCcw } from "lucide-react";

export default function RestartTest() {
  const [isDeleting, setIsDeleting] = React.useState(false);

  async function handleClick() {
    if (isDeleting) return;
    
    setIsDeleting(true);
    try {
      // Delete in-progress quiz from database
      const response = await fetch('/api/quiz/restart', {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        console.error('Failed to delete quiz:', await response.text());
      }

      // Clear localStorage
      localStorage.removeItem("lastResultPayload");
      localStorage.removeItem("htq-answers");
      localStorage.removeItem("quizResultId");
      localStorage.removeItem("anonUserId");
      localStorage.removeItem("branchCategory");
      localStorage.removeItem("lastTieBreakerQuestions");
      localStorage.removeItem("lastTieBreakerParams");
    } catch (error) {
      console.error('Restart error:', error);
    } finally {
      // Redirect to test page
      window.location.href = "/test/1";
    }
  }
  
  return (
    <Button
      onClick={handleClick}
      disabled={isDeleting}
      className="shadow-xs bg-neutral-100 text-neutral-900 font-bold text-[14px] !px-3.5 py-2 hover:scale-105 rounded-[8px] disabled:opacity-50"
    >
      <RefreshCcw />
      <p>{isDeleting ? 'Menghapus...' : 'Ulangi Test'}</p>
    </Button>
  );
}
