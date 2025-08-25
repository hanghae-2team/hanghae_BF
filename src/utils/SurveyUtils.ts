import brainSvg from '@/assets/survey/brain.svg';
import foodSvg from '@/assets/survey/food.svg';
import hmmSvg from '@/assets/survey/hmm.svg';

/** 설문 카드 */
export const SURVEY_CARDS = {
  personality: {
    type: 'personality',
    icon: brainSvg,
    title: '성향 분석',
    description: '10가지 질문으로 알아보는\n나의 성향 유형',
    colors: {
      gradient: 'from-pink-200 to-pink-300',
      border: 'border-pink-200',
      text: 'text-pink-700',
      textSecondary: 'text-pink-600',
      bg: 'from-pink-50 to-pink-100',
    },
  },
  value: {
    type: 'value',
    icon: hmmSvg,
    title: '가치관 분석',
    description: '무엇을 더 중요하게 생각하는지\n알아보는 가치관 테스트',
    colors: {
      gradient: 'from-amber-200 to-amber-300',
      border: 'border-amber-200',
      text: 'text-amber-700',
      textSecondary: 'text-amber-600',
      bg: 'from-amber-50 to-amber-100',
    },
  },
  taste: {
    type: 'taste',
    icon: foodSvg,
    title: '입맛 궁합',
    description: '나와 잘 맞는 입맛을\n찾아보는 입맛 취향 분석',
    colors: {
      gradient: 'from-red-200 to-red-300',
      border: 'border-red-200',
      text: 'text-red-700',
      textSecondary: 'text-red-600',
      bg: 'from-red-50 to-red-100',
    },
  },
} as const;

/** 설문 결과 발표 시간 */
export const SURVEY_RESULT_RELEASE_TIME = '2025-09-06T00:00:00';

/** 설문 결과 발표 타이머 */
export const SURVEY_RESULT_TIMER = [
  { key: 'days', label: '일' },
  { key: 'hours', label: '시간' },
  { key: 'minutes', label: '분' },
  { key: 'seconds', label: '초' },
];

/** 설문 결과 발표 타이머 포맷 */
export const formatTime = (value: number, key: string) => {
  if (key === 'days') return value.toString();
  return value.toString().padStart(2, '0');
};
