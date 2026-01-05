"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Answers = Record<number, string>;

const QuestionsContext = createContext<{
  answers: Answers;
  setAnswers: (qIndex: number, value: string) => void;
  clear: () => void;
}>({ answers: {}, setAnswers: () => {}, clear: () => {} });

export const QuestionsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [answers, setAnswers] = useState<Answers>(() => {
    try {
      return JSON.parse(localStorage.getItem("htq-answers") || "{}");
    } catch {
      return {};
    }
  });

  const setAnswer = (qIndex: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: value }));
  };

  const clear = () => {
    setAnswers({});
    localStorage.removeItem("htq-answers");
  };

  return (
    <QuestionsContext.Provider
      value={{ answers, setAnswers: setAnswer, clear }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

export const useQuestions = () => useContext(QuestionsContext);
