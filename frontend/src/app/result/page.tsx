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
    const fetchResult = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/quiz/results/${id ? `?id=${decodeURIComponent(id)}` : ""}`,
          {
            credentials: "include",
          },
        );

        if (res.status === 401) {
          const anonUserId =
            typeof window !== "undefined"
              ? localStorage.getItem("anonUserId")
              : null;
          if (!anonUserId) {
            if (mounted) {
              setError("Unauthorized access. Please log in or take the quiz.");
              return;
            }
          }
          const anonRes = await fetch(
            `/api/quiz/results/anonymous?anonUserId=${encodeURIComponent(anonUserId!)}`,
          );
          const anonJson = await anonRes.json();
          const list: any[] = anonJson.results || [];
          let found = null;
          if (id) found = list.find((r) => String(r.id) === String(id));
          if (!found) found = list[0] ?? null;
          if (mounted) setResult(found);
          return;
        }

        const json = await res.json();
        if (!res.ok) {
          if (mounted) setError(json.error || "Failed to fetch result");
          return;
        }
        const payloadResult =
          json.result ?? (Array.isArray(json.results) ? json.results[0] : null);
        if (mounted) setResult(payloadResult);
      } catch (err: any) {
        if (mounted) setError(err.message ?? "Error loading result");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchResult();
    return () => {
      mounted = false;
    };
  }, [id, router]);
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
