import React from "react";
import HasilJuz from "@/components/result-page/hasil-juz";
import RestartTest from "@/components/result-page/restart-test-button";
import ShareButton from "@/components/result-page/share-button";
import KonsultasiCard from "@/components/result-page/konsultasi-card";

export default function Result() {
  return (
    <div className="mx-21">
      <HasilJuz />
      <div className="flex flex-row justify-end gap-5 my-8">
        <RestartTest />
        <ShareButton />
      </div>
      <KonsultasiCard />
      <p></p>
    </div>
  );
}
