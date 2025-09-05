import { Heart, Sparkles, Star, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { twMerge } from 'tailwind-merge';

import { useAuth } from '@/contexts/AuthContext';
import { PATH } from '@/routers/router';
import { getParticleColor } from '@/utils/particleUtils';

export const Splash = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState(0);
  const [showRipple, setShowRipple] = useState(false);
  const { user } = useAuth();

  const handleStart = () => {
    navigate('/login');
  };

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 300),
      setTimeout(() => setStage(2), 1000),
      setTimeout(() => setStage(3), 1800),
      setTimeout(() => setShowRipple(true), 2200),
      setTimeout(() => setStage(4), 2500),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  if (user) return <Navigate to={PATH.RESULT_HOME()} />;

  const HeartIcon = () => (
    <div className="relative">
      <Heart className="w-20 h-20 sm:w-24 sm:h-24 fill text-blue-400 fill-blue-400 drop-shadow-xl" />
      <div className="absolute -top-2 -right-2">
        <div className="w-4 h-4 bg-pink-400 rounded-full animate-pulse" />
      </div>
      <div className="absolute -bottom-1 -left-1">
        <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" />
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* 화려한 배경 애니메이션 */}
      <div className="absolute inset-0">
        {/* 회전하는 그라데이션 배경 */}
        <div
          className={`absolute inset-0 bg-gradient-conic from-purple-500 to-purple-500 opacity-20 transition-all duration-2000 ${
            stage >= 1 ? 'animate-spin-slow scale-150' : 'scale-100'
          }`}
        />

        {/* 펄스 효과 */}
        <div
          className={`absolute inset-0 bg-gradient-radial from-blue-400/20 via-purple-500/10 to-transparent transition-all duration-1000 ${
            stage >= 2 ? 'animate-pulse scale-110' : 'scale-100 opacity-0'
          }`}
        />

        {/* 화려한 파티클들 */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className={`absolute transition-all duration-1000 ${stage >= 1 ? 'opacity-100' : 'opacity-0'}`}
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          >
            <div className={twMerge(`w-1 h-1 sm:w-2 sm:h-2 rounded-full animate-twinkle`, getParticleColor(i))} />
          </div>
        ))}

        {/* 큰 장식 요소들 */}
        {stage >= 2 && (
          <>
            <div className="absolute top-1/4 left-1/4 animate-float-slow">
              <Star className="w-8 h-8 text-yellow-300 opacity-60" />
            </div>
            <div className="absolute top-3/4 right-1/4 animate-float-reverse">
              <Sparkles className="w-6 h-6 text-pink-300 opacity-60" />
            </div>
            <div className="absolute top-1/2 left-1/6 animate-bounce">
              <Zap className="w-5 h-5 text-blue-300 opacity-60" />
            </div>
            <div className="absolute bottom-1/4 right-1/3 animate-spin-slow">
              <Star className="w-4 h-4 text-purple-300 opacity-60" />
            </div>
          </>
        )}
      </div>

      {/* 리플 효과 */}
      {showRipple && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 border-2 border-white/30 rounded-full animate-ping" />
          <div className="absolute w-64 h-64 border border-white/20 rounded-full animate-ping animation-delay-300" />
          <div className="absolute w-96 h-96 border border-white/10 rounded-full animate-ping animation-delay-600" />
        </div>
      )}

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 flex flex-col items-center space-y-8 md:px-6 w-full ">
        {/* 메인 로고 */}
        <div className="flex flex-col items-center space-y-6">
          <div className="relative group">
            {/* 메가 글로우 효과 */}
            <div
              className={`absolute inset-0 rounded-full bg-gradient-to-br from-pink-400 via-purple-500 to-blue-500 opacity-40 blur-3xl transition-all duration-2000 ${
                stage >= 1 ? 'scale-150 animate-pulse' : 'scale-100 opacity-0'
              }`}
            />

            {/* 로고 컨테이너 */}
            <div
              className={`relative z-10 w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center shadow-2xl border border-white/30 transition-all duration-1500 ease-out ${
                stage >= 1 ? 'scale-100 rotate-0 opacity-100' : 'scale-50 rotate-180 opacity-0'
              } ${stage >= 3 ? 'animate-bounce-gentle' : ''}`}
            >
              <div className={`transition-all duration-1000 ${stage >= 2 ? 'scale-110' : 'scale-100'}`}>
                <HeartIcon />
              </div>
            </div>

            {/* 회전하는 장식 요소들 */}
            <div
              className={`absolute -inset-8 transition-all duration-1000 ${
                stage >= 2 ? 'opacity-100 animate-spin-very-slow' : 'opacity-0'
              }`}
            >
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                <Star className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                <Sparkles className="w-5 h-5 text-pink-400" />
              </div>
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                <Zap className="w-4 h-4 text-blue-400" />
              </div>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                <Star className="w-4 h-4 text-purple-400" />
              </div>
            </div>
          </div>

          {/* 타이틀 */}
          <div
            className={`text-center transition-all duration-1500 ease-out ${
              stage >= 3 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
            }`}
          >
            <h1 className="font-bold font-PyeongchangPeace bg-gradient-to-r from-yellow-400 via-pink-400 to-blue-400 bg-clip-text text-transparent leading-tight text-3xl sm:text-4xl mb-4 animate-gradient">
              항해에서 BP 말고 BF 찾기
            </h1>
            <p className="text-white/80 font-PyeongchangPeace text-base sm:text-lg font-medium animate-fade-in-up">
              나랑 찰떡궁합인 항해인은 누구?
            </p>
          </div>
        </div>

        {/* 화려한 액션 버튼 */}
        <div
          className={`transition-all duration-1500 delay-300 ease-out ${
            stage >= 4 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
          }`}
        >
          <button
            onClick={handleStart}
            className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full text-white font-bold text-lg shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
            <span className="relative z-10">시작하기 ✨</span>
          </button>
        </div>
      </div>
    </div>
  );
};
