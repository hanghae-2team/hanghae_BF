import { BrainIcon } from 'lucide-react';

import personalityQuestions from '@/assets/questions/personality.json';
import { ProgressBar } from '@/components/survey/ProgressBar';
import { useSurvey } from '@/components/survey/SurveyContext';
import { SURVEY_PERSONALITY_OPTIONS } from '@/utils/SurveyUtils';

export const SurveyPersonality = () => {
  const { currentQuestion, selectQuestionAnswer } = useSurvey();

  // 현재 질문 데이터 가져오기
  const currentQuestionData = personalityQuestions[currentQuestion];

  // 답변 선택 처리
  const handleAnswerSelect = (answer: number) => {
    selectQuestionAnswer(currentQuestionData.id, answer);
  };

  // 진행률 계산
  const progress = ((currentQuestion + 1) / 10) * 100;

  return (
    <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12 xl:gap-16">
      {/* 왼쪽 섹션: 제목 + 진행률 */}
      <div className="lg:flex-[0.4] lg:text-left lg:pt-4">
        <div className="text-center lg:text-left mb-6 lg:mb-8">
          {/* 아이콘 추가 */}
          <div className="flex justify-center lg:justify-start mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-18 lg:h-18 xl:w-20 xl:h-20 bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300 rounded-2xl shadow-lg">
              <BrainIcon className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-pink-600" />
            </div>
          </div>
          <h1 className="text-2xl font-PyeongchangPeace sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-pink-600 to-pink-700 bg-clip-text text-transparent mb-3 lg:mb-4">
            성향 조사
          </h1>
        </div>
      </div>

      {/* 오른쪽 섹션: 질문 카드 */}
      <div className="lg:flex-1 lg:max-w-2xl">
        {/* 진행률 표시 */}
        <div className="mb-8 lg:mb-0">
          <ProgressBar currentQuestion={currentQuestion} progress={progress} surveyType="personality" />
        </div>

        <div className="text-center pb-6 pt-4 md:pt-8 sm:pt-10 lg:pt-10">
          <p className="text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-2xl leading-relaxed text-gray-800 px-4 font-semibold">
            {currentQuestionData.question}
          </p>
        </div>
        {/* 5지선다 답변 옵션 */}
        <div className="grid grid-cols-1 gap-2 md:gap-3 sm:gap-4 lg:gap-4">
          {SURVEY_PERSONALITY_OPTIONS.map((option) => (
            <div
              key={option.label}
              className="group cursor-pointer transition-all duration-500 border-2 border-pink-100 hover:border-pink-300 p-[14px] md:p-4 sm:p-5 lg:p-5 rounded-2xl shadow-sm hover:shadow-xl bg-gradient-to-r from-white to-pink-50/50 hover:from-pink-50 hover:to-pink-100 relative overflow-hidden"
              onClick={() => handleAnswerSelect(option.value)}
            >
              {/* 호버 시 배경 애니메이션 */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 to-pink-600/0 group-hover:from-pink-500/5 group-hover:to-pink-600/5 transition-all duration-500"></div>

              <div className="relative flex items-center justify-between">
                <div className="text-sm sm:text-base md:text-lg lg:text-base font-semibold text-gray-700 group-hover:text-pink-700 flex-1 text-center">
                  {option.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
