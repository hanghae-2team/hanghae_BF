import '@/styles/animation.css';

import { OptionsCard } from '@/components/survey/OptionsCard';
import { useSurvey } from '@/components/survey/SurveyContext';
import { Button } from '@/elements/button';
import { ShipLogo } from '@/elements/ShipLogo';
import type { SurveyCategory } from '@/types/survey';
import { SURVEY_CARDS } from '@/utils/SurveyUtils';

export const SurveyStart = () => {
  const { moveToNextCategory } = useSurvey();

  const handleStart = () => {
    moveToNextCategory();
  };

  return (
    <>
      <ShipLogo />
      {/* 메인 질문 */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4 leading-tight">나와 찰떡궁합인 항해인은?</h2>

      {/* 설명 */}
      <div className="space-y-2 mb-8">
        <p className="text-gray-600 text-base font-medium">성향, 가치관, 입맛까지!</p>
        <p className="text-gray-500 text-sm">3단계 간단 설문으로 당신의 BF를 찾아드릴게요</p>
      </div>

      {/* 3가지 옵션 */}
      <div className="space-y-4 mb-8">
        {Object.keys(SURVEY_CARDS).map((key) => (
          <OptionsCard key={key} category={key as SurveyCategory} />
        ))}
      </div>

      {/* 시작하기 */}
      <Button
        className="w-full cursor-pointer bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-bold text-lg py-4 shadow-lg hover:shadow-xl"
        size="lg"
        onClick={handleStart}
      >
        시작하기
      </Button>
    </>
  );
};
