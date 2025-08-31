import brainSvg from '@/assets/images/survey/brain.svg';
import foodSvg from '@/assets/images/survey/food.svg';
import hmmSvg from '@/assets/images/survey/hmm.svg';

/** 설문 카드 */
export const SURVEY_CARDS = {
  personality: {
    type: 'personality',
    icon: brainSvg,
    title: '성향',
    description: '어떤 사람인지 알아보는 성향 테스트',
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
    title: '가치관',
    description: '무엇을 중요하게 여기는지 알아보는 가치관 테스트',
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
    title: '입맛',
    description: '어떤 음식을 좋아하는지 알아보는 입맛 테스트',
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

/**성향 조사 선택지 */
export const SURVEY_PERSONALITY_OPTIONS = [
  { value: 1, label: '매우 그렇다' },
  { value: 2, label: '그렇다' },
  { value: 3, label: '보통이다' },
  { value: 4, label: '그렇지 않다' },
  { value: 5, label: '매우 그렇지 않다' },
];

// 답변을 카테고리별로 분류
export const categorizedAnswers = (answers: Record<string, number>) =>
  Object.entries(answers).reduce(
    (acc, [questionNum, value]) => {
      const num = parseInt(questionNum);
      if (num <= 10) {
        acc.personality.push(value);
      } else if (num <= 20) {
        acc.taste.push(value);
      } else if (num <= 30) {
        acc.values.push(value);
      }
      return acc;
    },
    { personality: [] as number[], taste: [] as number[], values: [] as number[] }
  );
