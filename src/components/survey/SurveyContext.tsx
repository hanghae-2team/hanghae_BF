import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router';

import { useSaveSurveyResult } from '@/apis/surveys';
import { useAuth } from '@/contexts/AuthContext';
import { PATH } from '@/routers/router';

interface SurveyState {
  currentCategory: 'start' | 'personality' | 'values' | 'taste' | 'complete';
  currentQuestion: number;
  isCompleted: boolean;
}

interface SurveyContextType extends SurveyState {
  moveToNextCategory: () => void;
  selectQuestionAnswer: (questionId: number, answer: number) => void;
  answers: Record<string, number>;
}

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export const SurveyProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [survey, setSurvey] = useState<SurveyState>({
    currentCategory: 'start',
    currentQuestion: 0,
    isCompleted: false,
  });

  const [answers, setAnswers] = useState<Record<string, number>>({});

  /** 다음 질문 이동 */
  const nextQuestion = () => {
    if (survey.currentQuestion < 9) {
      setSurvey((prev) => ({ ...prev, currentQuestion: prev.currentQuestion + 1 }));
    } else {
      moveToNextCategory();
    }
  };

  const { mutate: saveSurveyResult, isPending } = useSaveSurveyResult();

  /** 다음 카테고리 이동 */
  const moveToNextCategory = () => {
    const categories = ['personality', 'values', 'taste'];
    const currentIndex = categories.indexOf(survey.currentCategory);
    if (currentIndex < categories.length - 1) {
      // 다음 카테고리로 이동
      setSurvey((prev) => ({
        ...prev,
        currentCategory: categories[currentIndex + 1] as SurveyState['currentCategory'],
        currentQuestion: 0,
      }));
    } else {
      if (isPending) return; // 설문 결과 저장 중에 중복 저장 방지
      saveSurveyResult(
        { userId: user?.id ?? '', answers },
        {
          onSuccess: () => {
            navigate(PATH.SURVEY_COMPLETE());
          },
        }
      );
    }
  };

  /**질문 답변 선택 */
  const selectQuestionAnswer = (questionId: number, answer: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    nextQuestion();
  };

  return (
    <SurveyContext.Provider
      value={{
        ...survey,
        selectQuestionAnswer,
        moveToNextCategory,
        answers,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
};

export const useSurvey = () => {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error('useSurvey must be used within SurveyProvider');
  }
  return context;
};
