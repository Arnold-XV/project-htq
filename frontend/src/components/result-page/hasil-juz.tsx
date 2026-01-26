import React from "react";

export default function HasilJuz({ result }: { result?: any }) {
  if (!result) {
    return null;
  }

  const personality = result.personality ?? {};

  const juz = personality.juz_number ?? "-";
  const name = personality.name ?? "Hasil";
  const description = personality.description ?? "Deskripsi tidak tersedia.";
  const strengths: string[] = personality.strengths ?? [];
  const challenges: string[] = personality.challenges ?? [];

  const branch: string | null =
    (result.branch_category as string) ??
    (result._rawSubmitPayload?.branch_category as string) ??
    (result._rawSubmitPayload?.branch as string) ??
    (typeof window !== "undefined"
      ? localStorage.getItem("branchCategory")
      : null) ??
    null;

  const egoLevel =
    branch && branch.length >= 2
      ? branch.charAt(1) === "H"
        ? "HIGH"
        : "LOW"
      : null;
  const neoLevel =
    branch && branch.length >= 4
      ? branch.charAt(3) === "H"
        ? "HIGH"
        : "LOW"
      : null;

  const percentForLevel = (level: string | null) =>
    level === "HIGH" ? 90 : level === "LOW" ? 10 : 0;

  const scoresArr: { label: string; percent: number; level: string | null }[] =
    [
      { label: "EGO", percent: percentForLevel(egoLevel), level: egoLevel },
      { label: "NEO", percent: percentForLevel(neoLevel), level: neoLevel },
    ];

  return (
    <div id="hasil-juz-root" className="flex flex-col gap-7 mt-4.5">
      <div className="shadow-sm">
        <div
          className="relative bg-neutral-50 text-neutral-25 rounded-[10px] bg-no-repeat lg:bg-[length:100.94%_376.958%]  lg:bg-[-6px_-13px] bg-[length:100%_auto] bg-[0px_0px] bg-opa 
            md:bg-[length:100%_250%] md:bg-[0px_-10px] bg-center before:absolute before:inset-0 before:bg-[rgba(61,159,142,0.20)] before:rounded-[10px] px-4 py-2 xxs:pt-6 xxs:pb-6 xs:px-6 xs:pt-6 xs:pb-6 md:px-40 md:py-8 lg:px-50 lg:py-12 xl:pt-17 xl:pb-16 xl:pl-81.5 xl:pr-99"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.20), rgba(0,0,0,0.10)), url(/image/juz-result-bg.webp)",
          }}
        >
          <h4 className="font-bold lg:text-[38px] text-[26px] z-1">
            Juz {juz} - {name}
          </h4>
          <p className="lg:text-[22px] text-[16px] z-1">{description}</p>
        </div>
        <div className="pl-10.75 pr-8.5 pt-9.25 pb-13">
          <div className="text-center lg:text-[18px] text-[14px] flex flex-col gap-4 items-start">
            <div className="">
              <span className="font-bold">Strengths: </span>
              {strengths.length > 0 ? (
                strengths.map((strength, i) => (
                  <span key={i}>
                    <span>{strength}</span>
                    {strengths.length - 1 !== i && <span>, </span>}
                  </span>
                ))
              ) : (
                <p></p>
              )}
            </div>
            <div>
              <span className="font-bold">Challenges: </span>
              {challenges.length > 0 ? (
                challenges.map((challenge, i) => (
                  <span key={i}>
                    <span>{challenge}</span>
                    {challenges.length - 1 !== i && <span>, </span>}
                  </span>
                ))
              ) : (
                <p></p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex lg:flex-row flex-col items-stretch justify-center gap-[25px]">
        <div className="rounded-[10px] shadow-sm bg-neutral-50 px-5.5 pt-7 pb-13 flex-1">
          <p className="font-bold lg:text-[22px] text-[16px] border-b border-neutral-200 w-full">
            Karakteristik Utama
          </p>
          <div className="w-full flex flex-col gap-2 mt-2">
            {scoresArr.map(
              (
                s: { label: string; percent: number; level: string | null },
                i: number,
              ) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="flex flex-row justify-between items-center">
                    <p className="lg:text-[18px] text-[14px]">{s.label}</p>
                    <p className="bg-[#E6F6F4] px-2.5 py-[5px] text-[#007F6D] font-semibold rounded-[5px] lg:text-[16px] text-[12px]">
                      {s.level}
                    </p>
                  </div>
                  <div className="bg-neutral-200 rounded-[20px]">
                    <div
                      style={{ width: `${s.percent}%` }}
                      className="rounded-[20px] bg-gradient-to-r from-[#3D9F8E] to-[#177766] h-3"
                    />
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
        <div className="rounded-[10px] shadow-sm bg-neutral-50 px-5.5 pt-7 pb-13 flex-1">
          <p className="font-bold lg:text-[22px] text-[16px] pb-[9px] border-b  border-neutral-200 w-full">
            Arah Pengembangan Diri
          </p>
          <div className="space-y-2 mt-4">
            {personality.development_advice ? (
              <div className="flex gap-4">
                <p className="lg:text-[18px] text-[14px]">
                  {personality.development_advice}
                </p>
              </div>
            ) : null}
            {/* fallback message */}
            {!personality.development_advice && (
              <p className="text-[14px]">Tidak ada saran khusus.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
