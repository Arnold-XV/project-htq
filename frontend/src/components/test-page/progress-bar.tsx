import React from "react";

export default function ProgressBar({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const displayedPage = Math.min(
    Math.max(1, currentPage || 1),
    Math.max(1, totalPages || 1),
  );
  const percent =
    totalPages && totalPages > 0
      ? Math.min(100, Math.round((displayedPage / totalPages) * 100))
      : 100;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-medium">
          {displayedPage}/{totalPages}
        </div>
        <div className="text-sm text-neutral-500">{percent}%</div>
      </div>
      <div className="w-full bg-neutral-200 h-3 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#3D9F8E] to-[#177766]"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
