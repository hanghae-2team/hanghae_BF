import type { SurveyResult } from '@/apis/surveys';

export interface ChartWithUserData {
  id: string;
  name: string;
  image: string;
  link: string;
  personality: number;
  taste: number;
  values: number;
  adjustScore: number;
}

export const convertSurveyToChartData = (surveyData: SurveyResult, userName: string): ChartWithUserData => {
  // 성향: 1-5 척도를 백분율로 변환 (1=매우그렇다 → 100%, 5=매우그렇지않다 → 0%)
  const personalityAverage = surveyData.personality.reduce((a, b) => a + b, 0) / surveyData.personality.length;
  const personalityScore = ((6 - personalityAverage) / 5) * 100;

  // 입맛: 1번 선택지 선호도 (물냉면, 후라이드, 돼지고기 등)
  const tastePattern = (surveyData.taste.filter((ans) => ans === 1).length / surveyData.taste.length) * 100;

  // 가치관: 1번 선택지 선호도
  const valuesPattern = (surveyData.values.filter((ans) => ans === 1).length / surveyData.values.length) * 100;

  return {
    name: userName,
    personality: Math.round(personalityScore),
    taste: Math.round(tastePattern),
    values: Math.round(valuesPattern),
    id: '',
    image: '',
    link: '',
    adjustScore: 0,
  };
};
