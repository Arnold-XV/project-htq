"use client";

import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { RefreshCcw } from "lucide-react";

export default function RestartTest() {
  const router = useRouter();
  function handleClick() {
    router.push("/test/");
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
