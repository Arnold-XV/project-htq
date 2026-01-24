"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import HasilJuz from "@/components/result-page/hasil-juz";
import RestartTest from "@/components/result-page/restart-test-button";
import ShareButton from "@/components/result-page/share-button";
import KonsultasiCard from "@/components/result-page/konsultasi-card";

export default function Result() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id") ?? null;

  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const loadFromLocal = async () => {
      setLoading(true);
      try {
        const raw =
          typeof window !== "undefined"
            ? localStorage.getItem("lastResultPayload")
            : null;
        if (raw) {
          try {
            const payload = JSON.parse(raw);
            const immediateResult = {
              id: payload.result_id || payload.resultId || null,
              final_juz: payload.final_juz ?? null,
              juz_scores: payload.juz_scores ?? null,
              personality: payload.personality ?? null,
              completed: payload.completed ?? null,
              _rawSubmitPayload: payload,
            };
            if (mounted) {
              console.log("Loaded result from localStorage", immediateResult);
              setResult(immediateResult);
            }
            // DO NOT remove the key here — keep it so remounts / Fast Refresh still find it
            return;
          } catch (e) {
            console.warn("Invalid lastResultPayload", e);
          }
        }
        if (mounted) setResult(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadFromLocal();
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <div className="lg:mx-21 md:mx-10 mx-5">
      {loading && <p>Loading result...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !result && <p>Result not found</p>}

      {result && <HasilJuz result={result} />}
      <div className="flex flex-row md:justify-end justify-center gap-5 my-8">
        <RestartTest />
        <ShareButton />
      </div>
      <KonsultasiCard />
      <p></p>
    </div>
  );
}
