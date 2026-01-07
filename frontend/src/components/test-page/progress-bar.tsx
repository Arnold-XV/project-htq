import React from "react";

interface ProgressBarProps {
  currentPage: number;
  totalPages: number;
}

export default function ProgressBar({
  currentPage,
  totalPages,
}: ProgressBarProps) {
  const progressPercentage = Math.round((currentPage / totalPages) * 100);
  return (
    <div className="w-full">
      <div className="flex flex-row justify-between">
        <div className="mb-2">
          <p className="lg:text-[16px] text-xs">
            halaman {currentPage}/{totalPages}
          </p>
        </div>
        <p className="lg:text-[18px] text-xs">{progressPercentage}%</p>
      </div>
      <div className="bg-[#E6F6F4] rounded-[20px]">
        <div
          style={{ width: `${progressPercentage}%` }}
          className="rounded-[20px] bg-gradient-to-r from-[#3D9F8E] to-[#124F44] transition-all duration-300 h-2.5"
        ></div>
      </div>
    </div>
  );
}
