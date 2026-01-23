"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useQuestions } from "../../../components/test-page/questions-provider";
import { ChevronLeft } from "lucide-react";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import BackButton from "../../../components/test-page/back-button";
import NextButton from "../../../components/test-page/next-button";
import ProgressBar from "../../../components/test-page/progress-bar";
import NavbarTestPage from "@/components/test-page/navbar-test-page";

export default function TestPage() {
  const params = useParams();
  const router = useRouter();
  const page = Math.max(1, Number(params.page) || 1);
  const { answers, setAnswers } = useQuestions();
  const [questions, setQuestions] = useState<any[]>([]);
  const TOTAL_PAGES = 3;
  const start = 0;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isTieBreaker, setIsTieBreaker] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const [branchCategory, setBranchCategory] = useState<string | null>(() => {
    try {
      return typeof window !== "undefined"
        ? (searchParams?.get("branch") ?? null)
        : null;
    } catch {
      return null;
    }
  });

  const [resultId, setResultId] = useState<string | null>(() => {
    try {
      return typeof window !== "undefined"
        ? localStorage.getItem("quizResultId")
        : null;
    } catch {
      return null;
    }
  });

  const normalize = (raw: any[]) =>
    (raw || []).map((q: any) => ({
      id: q.id,
      text: q.question_text,
      order_number: q.order_number,
      branch_category: q.branch_category,
      options: (q.quiz_options || []).map((o: any) => ({
        id: o.id,
        label: o.option_text,
        value: o.option_value ?? null,
        points: o.points ?? null,
      })),
    }));

  useEffect(() => {
    let mounted = true;

    const fetchQuestionsForLayer = async (layerToFetch: number) => {
      setLoading(true);
      setError(null);
      try {
        let url = `/api/quiz/questions?layer=${layerToFetch}`;
        if (layerToFetch === 3) {
          if (!branchCategory) {
            setLoading(false);
            return;
          }
          url += `&branch=${encodeURIComponent(branchCategory)}`;
        }

        const res = await fetch(url, {
          method: "GET",
          credentials: "include",
        });

        if (res.status === 401) {
          router.push("/login");
          return;
        }

        const json = await res.json();
        if (!res.ok) {
          throw new Error(json.error || "Failed to fetch questions");
        }

        const fetchedQuestions = normalize(json.questions || json);
        if (mounted) {
          if (
            !fetchedQuestions ||
            fetchedQuestions.length === 0 ||
            (page === 3 &&
              questions.length > 0 &&
              questions[0]?.branch_category === branchCategory)
          ) {
            setLoading(false);
            return;
          }
          setQuestions(fetchedQuestions);
          setError(null);
          setIsTieBreaker(false);
        }
      } catch (err: any) {
        if (mounted) setError(err.message ?? "Error loading questions");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    if (
      questions.length === 0 ||
      (page === 3 && questions[0]?.branch_category !== branchCategory)
    ) {
      if (page !== 3 || (page === 3 && branchCategory)) {
        fetchQuestionsForLayer(page);
      }
    }

    return () => {
      mounted = false;
    };
  }, [router, page, branchCategory]);

  const pageQs = questions.slice(start, questions.length);
  console.log("pageQs:", pageQs);
  const setAnswer = (qKey: string | number, value: string) =>
    setAnswers(qKey as number, value);

  const allAnswered = pageQs.every((q, idx) => {
    const key = q.id ?? start + idx;
    return answers?.[key] !== undefined && answers?.[key] !== "";
  });

  const totalPages = TOTAL_PAGES;

  const submitLayer = async () => {
    try {
      let anonUserId =
        typeof window !== "undefined"
          ? localStorage.getItem("anonUserId")
          : null;

      if (!anonUserId && typeof window !== "undefined") {
        anonUserId = `anon_${Date.now().toString(36)}_${Math.random()
          .toString(36)
          .slice(2, 8)}`;
        try {
          localStorage.setItem("anonUserId", anonUserId);
        } catch {}
        try {
          document.cookie = `anonUserId=${anonUserId}; path=/;`;
        } catch {}
      }

      const currentQuestionIds = new Set(questions.map((q) => String(q.id)));
      const answersArray = Object.entries(answers || {})
        .filter(([k, v]) => currentQuestionIds.has(String(k)))
        .map(([k, v]) => ({
          question_id: Number(k),
          option_id: Number(v),
        }));

      if (answersArray.length === 0) {
        setError("Tidak ada jawaban untuk dikirim pada layer ini.");
        return;
      }

      let payload: any;
      if (page === 1) {
        payload = {
          layer: 1,
          answers: answersArray,
          anonUserId: anonUserId,
        };
      } else {
        payload = {
          layer: page,
          answers: answersArray,
          anonUserId: anonUserId,
        };
        if (resultId) payload.resultId = resultId;
      }

      Object.keys(payload).forEach(
        (k) =>
          (payload[k] === undefined || payload[k] === null) &&
          delete payload[k],
      );

      console.log("POST /api/quiz/submit payload:", payload);

      const res = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const raw = await res.text();
      let json: any;
      try {
        json = raw ? JSON.parse(raw) : {};
      } catch (e) {
        json = { error: "Invalid JSON response", raw };
      }

      if (!res.ok) {
        console.error(
          "Submit error status:",
          res.status,
          "body:",
          json,
          "raw:",
          raw,
        );
        setError(json.error || "Gagal submit layer.");
        return;
      }

      const returnedResultId =
        json.result_id || json.result?.id || json.resultId || null;
      if (returnedResultId) {
        setResultId(String(returnedResultId));
        try {
          localStorage.setItem("quizResultId", String(returnedResultId));
        } catch {}
      }

      // CASE 1: Quiz completed (no tiebreaker) -> navigate to result page
      if (
        json.completed === true ||
        /quiz completed/i.test(json.message || "")
      ) {
        const idToShow = returnedResultId;
        if (idToShow) {
          router.push(`/result?id=${encodeURIComponent(idToShow)}`);
          return;
        } else {
          router.push("/result");
          return;
        }
      }

      // CASE 2: Tie detected -> fetch tiebreaker questions (layer 4) and navigate
      if (
        json.had_tie ||
        json.next_layer === 4 ||
        json.next_action === "fetch_tiebreaker"
      ) {
        const params = json.tiebreaker_params || json.tiebreakerParams || {};
        try {
          if (returnedResultId)
            localStorage.setItem("quizResultId", String(returnedResultId));
          if (params.juzA)
            localStorage.setItem("tiebreaker_juzA", String(params.juzA));
          if (params.juzB)
            localStorage.setItem("tiebreaker_juzB", String(params.juzB));
        } catch {}

        if (params.juzA && params.juzB) {
          const tbr = await fetch(
            `/api/quiz/tie-breaker?juzA=${encodeURIComponent(params.juzA)}&juzB=${encodeURIComponent(params.juzB)}`,
            { method: "GET", credentials: "include" },
          );
          const tbJson = await tbr.json();
          if (
            tbr.ok &&
            Array.isArray(tbJson.questions) &&
            tbJson.questions.length > 0
          ) {
            const tbq = normalize(tbJson.questions);
            setQuestions(tbq);
            setIsTieBreaker(true);
            router.push(
              `/test/4?juzA=${encodeURIComponent(params.juzA)}&juzB=${encodeURIComponent(params.juzB)}`,
            );
            return;
          } else {
            setError(tbJson.error || "Gagal mengambil tie-breaker questions.");
            return;
          }
        }

        if (json.tie_breaker?.questions || json.tieBreaker?.questions) {
          const tb = json.tie_breaker || json.tieBreaker;
          const tbq = normalize(tb.questions);
          setQuestions(tbq);
          setIsTieBreaker(true);
          router.push(`/test/4`);
          return;
        }

        setError("Tie detected but no tiebreaker parameters available.");
        return;
      }

      // CASE 3: Normal next_layer flow (including layer 3 branch)
      if (json.next_layer && typeof json.next_layer === "number") {
        const nextLayer = json.next_layer;
        const branchForNext = json.branch_category ?? null;
        const url =
          nextLayer === 3 && branchForNext
            ? `/api/quiz/questions?layer=3&branch=${encodeURIComponent(branchForNext)}`
            : `/api/quiz/questions?layer=${nextLayer}`;

        const qres = await fetch(url, {
          method: "GET",
          credentials: "include",
        });
        const qjson = await qres.json();
        if (!qres.ok) {
          setError(
            qjson.error || "Gagal mengambil pertanyaan layer berikutnya.",
          );
          return;
        }
        const nx = normalize(qjson.questions || qjson);
        setQuestions(nx);
        setIsTieBreaker(false);
        if (nextLayer === 3 && branchForNext) {
          router.push(`/test/3?branch=${encodeURIComponent(branchForNext)}`);
        } else {
          router.push(`/test/${nextLayer}`);
        }
        return;
      }

      if (Array.isArray(json.questions) && json.questions.length > 0) {
        const nx = normalize(json.questions);
        setQuestions(nx);
        setIsTieBreaker(false);
        if (page < TOTAL_PAGES) router.push(`/test/${page + 1}`);
        return;
      }

      router.push("/result");
    } catch (err) {
      console.error("Submit exception:", err);
      setError("Terjadi kesalahan saat submit.");
    }
  };

  const submitQuiz = async () => {
    await submitLayer();
  };

  const next = () => {
    submitLayer();
  };

  const prev = () => {
    if (page > 1) {
      router.push(`/test/${page - 1}`);
    }
  };

  return (
    <div>
      <NavbarTestPage />
      <Link href="/">
        <Button className="bg-neutral-25 text-neutral-800 rounded-[8px] lg:ml-14.5 ml-4.5 mt-30 mb-8 shadow-sm hover:bg-neutral-200">
          <ChevronLeft className="mr-2" />
          <p className="text-sm text-neutral-800 font-bold">Keluar</p>
        </Button>
      </Link>

      <div className="overflow-hidden">
        <div className="lg:mx-36.75 mx-4.5 flex flex-col">
          <ProgressBar currentPage={page} totalPages={totalPages}></ProgressBar>

          {loading && <p className="text-center mt-6">Loading questions...</p>}
          {error && <p className="text-center text-red-500 mt-6">{error}</p>}

          {pageQs.map((q, idx) => {
            const key = q.id ?? start + idx;
            return (
              <div key={key} className="pt-12 ">
                <div className="py-9.25 lg:px-15.25 px-5.5 bg-neutral-25 border-0.5 border-neutral-100 rounded-[15px] shadow-xs">
                  <legend className="mb-5.5 font-bold lg:text-[18px] text-sm">
                    {q.text}
                  </legend>
                  <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 auto-rows-fr">
                    {(q.options ?? []).map((opt: any) => {
                      const optionId = String(opt.id);
                      const optionLabel = opt.label ?? optionId;
                      const clicked = answers?.[key] === optionId;
                      return (
                        <label
                          key={optionId}
                          className={`flex items-center gap-2 h-full px-5 py-2.5 rounded-[10px] border border-neutral-400 cursor-pointer hover:bg-[#BEDED066]  ${
                            clicked ? "bg-[#BEDED066]" : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name={`q-${key}`}
                            value={optionId}
                            checked={answers?.[key] === optionId}
                            onChange={() => setAnswer(key, optionId)}
                            className={`w-6 h-6 flex-shrink-0  ${
                              clicked ? "accent-background-2" : ""
                            }`}
                          />
                          <span className="lg:text-[18px] text-sm">
                            {optionLabel}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="bg-neutral-25 border-1 border-neutral-100 mt-15">
        <div className="mt-6 flex flex-row justify-between lg:mx-19.25 mx-4.5 gap-3">
          <BackButton prev={prev} page={page} />
          <NextButton
            next={next}
            allAnswered={allAnswered}
            page={page}
            questions={questions}
            totalPages={totalPages}
          />
        </div>
        <p className="text-center text-sm text-neutral-500 mt-2 mb-3.75">
          Jawab semua pertanyaan terlebih dahulu
        </p>
      </div>
    </div>
  );
}
