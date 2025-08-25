import '@/styles/animation.css';

import { ShipLogo } from '@/components/survey/ShipLogo';
import { Button } from '@/elements/button';
import { Card, CardContent } from '@/elements/card';

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
            <p className="text-gray-600 text-base font-medium">성향, 분노포인트, 입맛까지!</p>
            <p className="text-gray-500 text-sm">3단계 간단 설문으로 당신의 베스트 프렌드를 찾아드릴게요</p>
          </div>

          {/* 3가지 옵션 */}
          <div className="space-y-4 mb-8">
            {/* 성향 분석 */}
            <div className="group p-4 bg-gradient-to-r from-pink-50 to-pink-100 rounded-2xl border border-pink-200 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-br from-pink-200 to-pink-300 rounded-xl shadow-md">
                  <div className="text-3xl">🧠</div>
                </div>
                <div className="text-left flex-1">
                  <div className="font-bold text-pink-700 text-base mb-1">성향 분석</div>
                  <div className="text-sm text-pink-600 leading-relaxed">
                    10문항으로 알아보는
                    <br />
                    나의 기본 성향
                  </div>
                </div>
              </div>
            </div>

            {/* 분노 포인트 */}
            <div className="group p-4 bg-gradient-to-r from-amber-50 to-amber-100 rounded-2xl border border-amber-200 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-br from-amber-200 to-amber-300 rounded-xl shadow-md">
                  <div className="text-3xl">😤</div>
                </div>
                <div className="text-left flex-1">
                  <div className="font-bold text-amber-700 text-base mb-1">분노 포인트</div>
                  <div className="text-sm text-amber-600 leading-relaxed">
                    같은 걸 싫어하면
                    <br />
                    가치관이 통한다!
                  </div>
                </div>
              </div>
            </div>

            {/* 입맛 궁합 */}
            <div className="group p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-2xl border border-red-200 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-br from-red-200 to-red-300 rounded-xl shadow-md">
                  <div className="text-3xl">🍜</div>
                </div>
                <div className="text-left flex-1">
                  <div className="font-bold text-red-700 text-base mb-1">입맛 궁합</div>
                  <div className="text-sm text-red-600 leading-relaxed">
                    맛집 탐방을 함께할
                    <br />
                    든든한 파트너
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 시작하기 버튼 */}
          <Button
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold text-lg py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0"
            size="lg"
          >
            <span className="mr-2">🚀</span>
            시작하기
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
