"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type Answers = Record<number, string>;

const QuestionsContext = createContext<{
  answers: Answers;
  setAnswers: (qIndex: number, value: string) => void;
  clear: () => void;
}>({ answers: {}, setAnswers: () => {}, clear: () => {} });

const STORAGE_KEY = "htq-answers";

export const QuestionsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [answers, setAnswersState] = useState<Answers>({});
  const didLoad = useRef(false);
  const didMount = useRef(false);

  useEffect(() => {
    if (didLoad.current) return;
    didLoad.current = true;

    requestAnimationFrame(() => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed === "object") {
            setAnswersState(parsed);
          }
        }
      } catch {}
      didMount.current = true;
    });
  }, []);

  useEffect(() => {
    if (!didMount.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch {}
  }, [answers]);

  const setAnswer = useCallback((qIndex: number, value: string) => {
    setAnswersState((prev) => ({ ...prev, [qIndex]: value }));
  }, []);

  const clear = useCallback(() => {
    setAnswersState({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  return (
    <QuestionsContext.Provider
      value={{ answers, setAnswers: setAnswer, clear }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

export const useQuestions = () => useContext(QuestionsContext);
