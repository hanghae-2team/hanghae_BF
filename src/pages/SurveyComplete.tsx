import { CheckCircleIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { SurveyLayout } from '@/components/survey/SurveyLayout';
import { Button } from '@/elements/button';
import { PATH } from '@/routers/router';
import { formatTime, SURVEY_RESULT_RELEASE_TIME, SURVEY_RESULT_TIMER } from '@/utils/SurveyUtils';

export const SurveyComplete = () => {
  const navigate = useNavigate();
  /** 설문 결과 발표 시간 */
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(SURVEY_RESULT_RELEASE_TIME);

    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const resetSurvey = () => {
    navigate(PATH.SURVEY());
  };

  return (
    <SurveyLayout>
      <div className="flex flex-col lg:flex-col lg:items-center lg:gap-12 xl:gap-16">
        {/* 왼쪽 섹션: 완료 아이콘 + 텍스트 */}
        <div className="flex-1 text-center">
          <div className="text-center flex flex-col items-center justify-center mb-8 lg:mb-0 relative">
            <div className="flex justify-center lg:justify-start mb-6 lg:mb-8">
              <div className="relative">
                {/* 메인 완료 아이콘 */}
                <div className="inline-flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-28 lg:h-28 xl:w-32 xl:h-32 bg-gradient-to-br from-emerald-100 via-green-200 to-emerald-300 rounded-full shadow-2xl relative z-10">
                  <CheckCircleIcon className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-16 lg:h-16 xl:w-18 xl:h-18 text-emerald-600" />
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-PyeongchangPeace sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 bg-clip-text text-transparent mb-4 lg:mb-6 leading-tight">
              설문조사 완료!
            </h2>
            <p className="text-gray-600 text-lg sm:text-xl md:text-2xl lg:text-xl font-medium">
              소중한 답변 감사합니다
            </p>
          </div>
        </div>

        {/* 오른쪽 섹션: 카운트다운 + 버튼 */}
        <div className="flex-1 max-w-xl w-full">
          {/* 결과 공개 카운트다운 */}
          <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl lg:rounded-[2rem] p-6 sm:p-7 md:p-8 lg:p-6 xl:p-8 mb-8 border border-blue-100/50 shadow-2xl backdrop-blur-sm relative overflow-hidden">
            {/* 장식적 배경 */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-200/20 to-transparent rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-200/20 to-transparent rounded-full -ml-12 -mb-12"></div>

            <div className="relative z-10 mb-6 lg:mb-8 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                <h3 className="text-blue-700 font-bold text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl">
                  결과 공개는
                </h3>
              </div>
              <p className="text-blue-600 text-base sm:text-lg md:text-xl lg:text-lg">
                2025년 9월 6일까지 기다려주세요!
              </p>
            </div>

            {/* 카운트다운 타이머 */}
            <div className="relative z-10 grid grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-4 mb-4">
              {SURVEY_RESULT_TIMER.map(({ key, label }, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-3 sm:p-4 md:p-5 lg:p-4 text-center border border-blue-100/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="text-blue-600 font-bold text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl mb-1">
                    {formatTime(timeLeft[key as keyof typeof timeLeft], key)}
                  </div>
                  <div className="text-blue-500 text-xs sm:text-sm md:text-base lg:text-sm font-medium">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 다시하기 버튼 */}
          <Button
            className="w-full max-w-md cursor-pointer bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 text-white font-bold text-lg sm:text-xl md:text-xl py-4 sm:py-5 md:py-6 lg:py-4 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 rounded-2xl"
            size="lg"
            onClick={resetSurvey}
          >
            설문 다시하기
          </Button>
        </div>
      </div>
    </SurveyLayout>
  );
};
