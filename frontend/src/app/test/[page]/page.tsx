"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuestions } from "../../../../components/questions-provider";
import questions from "../../../../data/dummy-questions.json";

export default function TestPage() {
  const params = useParams();
  const router = useRouter();
  const page = Math.max(1, Number(params.page) || 1);
  const perPage = 5;
  const start = (page - 1) * perPage;
  const pageQs = questions.slice(start, start + perPage);
  const { answers, setAnswers } = useQuestions();
  const next = () => {
    if (page < Math.ceil(questions.length / perPage)) {
      router.push(`/test/${page + 1}`);
    } else {
      router.push("/results");
    }
  };

  const prev = () => {
    if (page > 1) {
      router.push(`/test/${page - 1}`);
    }
  };

  const setAnswer = (qKey: string | number, value: string) =>
    setAnswers(qKey as number, value);

  const allAnswered = pageQs.every((q, idx) => {
    const key = q.id ?? start + idx;
    return answers?.[key] !== undefined && answers?.[key] !== "";
  });
  return (
    <div>
      <h2>Halaman {page}</h2>
      <div className="space-y-6">
        {pageQs.map((q, idx) => {
          const key = q.id ?? start + idx;
          return (
            <fieldset key={key} className="border-b pb-4">
              <legend className="mb-2 font-medium">{q.text}</legend>
              <div className="flex gap-4">
                {(q.options ?? []).map((opt: string) => (
                  <label key={opt} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`q-${key}`}
                      value={opt}
                      checked={answers?.[key] === opt}
                      onChange={() => setAnswer(key, opt)}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          );
        })}
      </div>
      <div className="mt-6 flex gap-3">
        <button
          onClick={prev}
          disabled={page === 1}
          className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
        >
          Kembali
        </button>
        <button
          onClick={next}
          disabled={!allAnswered}
          className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
        >
          {page < Math.ceil(questions.length / perPage) ? "Lanjut" : "Selesai"}
        </button>
      </div>
    </div>
  );
}
