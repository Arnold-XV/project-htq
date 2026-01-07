"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuestions } from "../../../components/test-page/questions-provider";
import questions from "../../../../data/dummy-questions.json";
import { ArrowLeft, ArrowRight, ChevronLeft } from "lucide-react";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import BackButton from "../../../components/test-page/back-button";
import NextButton from "../../../components/test-page/next-button";
import ProgressBar from "../../../components/test-page/progress-bar";

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

  const totalPages = Math.ceil(questions.length / perPage);
  return (
    <div>
      <Link href="/">
        <Button className="bg-neutral-25 text-neutral-800 rounded-[8px] lg:ml-14.5 ml:4.5 mt-25.25 mb-8">
          <ChevronLeft className="mr-2" />
          <p className="text-sm text-neutral-800 font-bold">Keluar</p>
        </Button>
      </Link>

      <div className="overflow-hidden">
        <div className="lg:mx-36.75 mx-4.5 flex flex-col">
          <ProgressBar currentPage={page} totalPages={totalPages}></ProgressBar>

          {pageQs.map((q, idx) => {
            const key = q.id ?? start + idx;
            return (
              <div key={key} className="pt-12 ">
                <div className="py-9.25 lg:px-15.25 px-5.5 bg-neutral-25 border-0.5 border-neutral-100 rounded-[15px] shadow-xs">
                  <legend className="mb-5.5 font-bold lg:text-[18px] text-sm">
                    {q.text}
                  </legend>
                  <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 auto-rows-fr">
                    {(q.options ?? []).map((opt: string) => {
                      const clicked = answers?.[key] === opt;
                      return (
                        <label
                          key={opt}
                          className={`flex items-center gap-2 h-full px-5 py-2.5 rounded-[10px] border border-neutral-400 cursor-pointer hover:bg-[#BEDED066]  ${
                            clicked ? "bg-[#BEDED066]" : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name={`q-${key}`}
                            value={opt}
                            checked={answers?.[key] === opt}
                            onChange={() => setAnswer(key, opt)}
                            className={`w-6 h-6 flex-shrink-0  ${
                              clicked ? "accent-background-2" : ""
                            }`}
                          />
                          <span className="lg:text-[18px] text-sm">{opt}</span>
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
            perPage={perPage}
          />
        </div>
        <p className="text-center text-sm text-neutral-500 mt-2 mb-3.75">
          Jawab semua pertanyaan terlebih dahulu
        </p>
      </div>
    </div>
  );
}
