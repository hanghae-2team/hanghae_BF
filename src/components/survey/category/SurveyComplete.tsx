import { CheckCircleIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/elements/button';
import { formatTime, SURVEY_RESULT_RELEASE_TIME, SURVEY_RESULT_TIMER } from '@/utils/SurveyUtils';

export const SurveyComplete = () => {
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

  return (
    <>
      {/* 완료 헤더 */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-200 rounded-full mb-4 shadow-lg">
          <CheckCircleIcon className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">설문조사 완료!</h2>
        <p className="text-gray-600 text-lg">소중한 답변 감사합니다 </p>
      </div>

      {/* 결과 공개 카운트다운 */}
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-6 mb-12 border border-blue-100 shadow-lg">
        <div className="mb-4">
          <h3 className="text-blue-700 font-bold text-lg">결과 공개는</h3>
          <p className="text-blue-600 text-sm">2025년 9월 6일까지 기다려주세요!</p>
        </div>

        {/* 카운트다운 타이머 */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          {SURVEY_RESULT_TIMER.map(({ key, label }, index) => (
            <div key={index} className="bg-white rounded-xl p-3 text-center border border-blue-100 shadow-sm">
              <div className="text-blue-600 font-bold text-2xl">
                {formatTime(timeLeft[key as keyof typeof timeLeft], key)}
              </div>
              <div className="text-blue-500 text-xs">{label}</div>
            </div>
          ))}
        </div>
      </div>
      <Button
        className="w-full cursor-pointer bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-bold text-lg py-4 shadow-lg hover:shadow-xl"
        size="lg"
      >
        설문 다시하기
      </Button>
    </>
  );
};
