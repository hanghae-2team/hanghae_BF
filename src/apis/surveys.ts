import { useMutation } from '@tanstack/react-query';

import surveyData from '@/data/survey.json';
import { categorizedAnswers } from '@/utils/SurveyUtils';

// 타입 정의
export interface SurveyData {
  personality: number[];
  taste: number[];
  values: number[];
}

export interface SurveyResult extends SurveyData {
  completedAt: string;
}

// JSON 데이터 타입
interface SurveyRecord extends SurveyResult {
  id: string;
}

// JSON 데이터를 타입으로 캐스팅
const surveys = surveyData as SurveyRecord[];

// 1. 설문 결과 저장 (JSON은 읽기 전용이므로 로컬에서만 처리)
export const saveSurveyResult = async (
  userId: string,
  answers: Record<string, number>
): Promise<{ success: boolean; message: string }> => {
  try {
    const data = categorizedAnswers(answers);

    const surveyResult: SurveyResult = {
      ...data,
      completedAt: new Date().toISOString(),
    };

    console.log(`설문 결과 저장 (읽기 전용 모드): ${userId}`, surveyResult);

    return { success: true, message: '설문 결과가 성공적으로 저장되었습니다.' };
  } catch (error) {
    console.error('Error saving survey:', error);
    throw new Error('설문 결과 저장에 실패했습니다.');
  }
};

// 설문 결과 저장 tanstack query useMutation
export const useSaveSurveyResult = () => {
  return useMutation({
    mutationFn: ({ userId, answers }: { userId: string; answers: Record<string, number> }) =>
      saveSurveyResult(userId, answers),
    onSuccess: () => {
      console.log('설문 결과가 성공적으로 저장되었습니다.');
    },
    onError: () => {
      console.log('설문 결과 저장에 실패했습니다.');
    },
  });
};

// 2. 설문 결과 조회
export const getSurveyResult = async (
  userId: string
): Promise<{ success: boolean; data?: SurveyResult; message?: string }> => {
  try {
    const survey = surveys.find((s) => s.id === userId);

    if (!survey) {
      return { success: false, message: '설문 결과를 찾을 수 없습니다.' };
    }

    const surveyResult: SurveyResult = {
      personality: survey.personality,
      taste: survey.taste,
      values: survey.values,
      completedAt: survey.completedAt,
    };
    return { success: true, data: surveyResult };
  } catch (error) {
    console.error('Error getting survey result:', error);
    return { success: false, message: '설문 결과 조회에 실패했습니다.' };
  }
};
