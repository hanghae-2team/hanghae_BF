import { Sparkles, Star } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { Button } from '@/elements/button';

interface SplashScreenProps {
  onComplete?: () => void;
  duration?: number;
  isSkipButton?: boolean;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete, duration = 3000, isSkipButton = true }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, duration / 50);

    return () => clearInterval(interval);
  }, [isVisible, duration]);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        setIsComplete(true);
        onComplete?.();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  const handleSkip = () => {
    setProgress(100);
    setIsComplete(true);
    onComplete?.();
  };

  if (isComplete) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* 움직이는 배경 요소들 */}
      <div className="absolute inset-0">
        {/* 부유하는 파티클들 */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                i % 3 === 0 ? 'bg-blue-400' : i % 3 === 1 ? 'bg-purple-400' : 'bg-pink-400'
              } opacity-60`}
            />
          </div>
        ))}

        {/* 움직이는 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/20 to-transparent animate-pulse" />
      </div>

      {/* 메인 콘텐츠 */}
      <div
        className={`relative z-10 flex flex-col items-center space-y-6 px-4 w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-2xl transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {/* 로고/브랜드 영역 */}
        <div className="flex flex-col items-center space-y-4 sm:space-y-5 lg:space-y-6">
          {/* 3D 로고 컨테이너 */}
          <div className="relative group">
            {/* 입체적인 배경 효과 */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 opacity-20 blur-xl animate-pulse group-hover:scale-110 transition-transform duration-500" />
            <div
              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-400 to-orange-400 opacity-10 blur-lg animate-pulse"
              style={{ animationDelay: '1s' }}
            />

            {/* 메인 로고 아이콘 */}
            <div
              className="relative z-10 w-36 h-36 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-2xl bg-gradient-to-br bg-white flex items-center justify-center shadow-2xl transform transition-all duration-500 group-hover:rotate-6 group-hover:scale-105 animate-bounce overflow-hidden"
              style={{ animationDuration: '2s' }}
            >
              <img
                src="/Camping.png"
                alt="캠핑 로고"
                className="w-24 h-24 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-contain animate-pulse"
              />
            </div>

            {/* 장식 요소들 */}
            <div className="absolute -top-2 -right-2 animate-spin" style={{ animationDuration: '3s' }}>
              <Star className="w-4 h-4 text-yellow-400" />
            </div>
            <div className="absolute -bottom-2 -left-2 animate-ping">
              <Sparkles className="w-4 h-4 text-pink-400" />
            </div>
          </div>

          {/* 애니메이션 타이틀 */}
          <div className="text-center">
            <h1 className="font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight text-2xl sm:text-2xl lg:text:3xl xl:text-4xl animate-fade-in-up">
              항해에서 BP 말고 BF 찾기
            </h1>
            <p
              className="mt-2 text-sm text-gray-600 dark:text-gray-300 sm:text-base lg:text-lg xl:text-xl animate-fade-in-up"
              style={{ animationDelay: '0.3s' }}
            >
              항해에서 BF를 찾아보세요!
            </p>
          </div>
        </div>

        {/* 로딩 진행률 */}
        {/* <div className="w-full space-y-4 sm:space-y-5 lg:space-y-6">
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 sm:text-base lg:text-lg">
            <span className="animate-pulse">로딩 중...</span>
            <span className="font-mono bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
              {progress}%
            </span>
          </div>

          <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-400 sm:text-sm lg:text-base">
            <Loader2 className="h-3 w-3 animate-spin sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-blue-500" />
            <span className="text-center animate-pulse">시스템을 준비하고 있어요!</span>
          </div>
        </div> */}

        {/* 건너뛰기 버튼 */}
        {isSkipButton && progress < 100 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSkip}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-sm sm:text-base lg:text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            건너뛰기
          </Button>
        )}
      </div>

      {/* 하단 장식 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 sm:bottom-8 lg:bottom-10 xl:bottom-12">
        <div className="flex space-x-2 sm:space-x-3 lg:space-x-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 sm:h-2.5 sm:w-2.5 lg:h-3 lg:w-3 rounded-full transition-all duration-500 transform ${
                progress >= (i + 1) * 33
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-110 shadow-lg animate-pulse'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
