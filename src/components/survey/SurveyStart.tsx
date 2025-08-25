import '@/styles/animation.css';

import { OptionsCard } from '@/components/survey/OptionsCard';
import { ShipLogo } from '@/components/survey/ShipLogo';
import { Button } from '@/elements/button';
import { Card, CardContent } from '@/elements/card';
import type { SurveyType } from '@/types/survey';
import { SURVEY_CARDS } from '@/utils/SurveyUtils';

export const SurveyStart = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-8 relative overflow-hidden">
      {/* 메인 카드 */}
      <Card className="max-w-sm mx-auto bg-white/90 backdrop-blur-sm border-0 shadow-2xl relative z-10">
        <CardContent className="text-center pt-8 pb-8">
          <ShipLogo />

          {/* 메인 질문 */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4 leading-tight">나와 찰떡궁합인 항해은?</h2>

          {/* 설명 */}
          <div className="space-y-2 mb-8">
            <p className="text-gray-600 text-base font-medium">성향, 가치관, 입맛까지!</p>
            <p className="text-gray-500 text-sm">3단계 간단 설문으로 당신의 BF를 찾아드릴게요</p>
          </div>

          {/* 3가지 옵션 */}
          <div className="space-y-4 mb-8">
            {Object.keys(SURVEY_CARDS).map((key) => (
              <OptionsCard key={key} type={key as SurveyType} />
            ))}
          </div>

          {/* 시작하기 버튼 */}
          <Button
            className="w-full bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-bold text-lg py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0"
            size="lg"
          >
            시작하기
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
