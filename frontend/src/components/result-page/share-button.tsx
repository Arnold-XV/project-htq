"use client";

import React from "react";
import { Button } from "../ui/button";
import { Send } from "lucide-react";

export default function ShareButton() {
  return (
    <Button
      className="bg-gradient-to-t from-[#3D9F8E] to-[#0E5C51] text-[#EFEFEF] !px-3.5 py-2 hover:!from-tosca hover:!to-tosca"
      variant="default"
      onClick={() => {}}
    >
      <Send className="mr-2" />
      Bagikan Hasil
    </Button>
  );
}
