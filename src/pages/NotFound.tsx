import { Compass, Home, MapPin, Sparkle, Sparkles, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
  icon: React.ComponentType<{ size: number; className: string }>;
  size: number;
}

export const NotFound = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    setIsVisible(true);

    // 랜덤 플로팅 요소들 생성
    const elements = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 4,
      icon: [Sparkle, Sparkles, Star][Math.floor(Math.random() * 3)],
      size: 16 + Math.random() * 16,
    }));

    setFloatingElements(elements);
  }, []);

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center relative overflow-hidden">
      {/* 배경 애니메이션 */}
      <div className="absolute inset-0">
        {/* 웨이브 배경 */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-800/30 to-transparent">
          <div className="absolute inset-0 bg-wave-pattern opacity-20 animate-wave" />
        </div>
        {floatingElements.map((element) => {
          const IconComponent = element.icon;
          return (
            <div
              key={element.id}
              className="absolute opacity-20 animate-float"
              style={{
                left: `${element.x}%`,
                top: `${element.y}%`,
                animationDelay: `${element.delay}s`,
                animationDuration: `${element.duration}s`,
              }}
            >
              <IconComponent size={element.size} className="text-blue-300" />
            </div>
          );
        })}
      </div>

      {/* 메인 컨텐츠 */}
      <div
        className={`relative z-10 text-center px-6 w-full max-w-2xl transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* 404 숫자 */}
        <div className="mb-8">
          <div className="relative inline-block">
            {/* 글로우 효과 */}
            <div className="absolute inset-0 text-8xl sm:text-9xl lg:text-[12rem] font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent blur-sm opacity-50">
              404
            </div>
            {/* 메인 숫자 */}
            <h1 className="relative text-8xl sm:text-9xl lg:text-[12rem] font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              404
            </h1>
          </div>
        </div>

        {/* 아이콘과 메시지 */}
        <div className="mb-8 space-y-6">
          {/* 배 아이콘 */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20 flex items-center justify-center animate-bounce-slow">
                {/* 배 이모지 대신 Compass 아이콘 사용 */}
                <Compass className="w-12 h-12 sm:w-16 sm:h-16 text-blue-300" />
              </div>

              {/* 주변 장식 */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping" />
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-pink-400 rounded-full animate-pulse" />

              {/* 회전하는 나침반 */}
              <div className="absolute inset-0 border-2 border-dashed border-blue-300/30 rounded-full animate-spin-slow" />
            </div>
          </div>

          {/* 메시지 */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">항로를 잃었네요!</h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-2">이 페이지는 바다 한복판에서 사라졌어요</p>
            <p className="text-base sm:text-lg text-blue-200/80">다른 항해인들이 있는 곳으로 돌아갈까요?</p>
          </div>
        </div>

        {/* 액션 버튼들 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* 홈으로 버튼 */}
          <button
            onClick={handleGoHome}
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-bold text-lg shadow-xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1 overflow-hidden min-w-[200px]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Home size={20} />
              홈으로 돌아가기
            </span>
          </button>
        </div>

        <div className="mt-12 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <MapPin size={20} className="text-blue-300" />
            <span className="text-blue-100 font-medium">길을 잃으셨나요?</span>
          </div>
          <p className="text-sm text-blue-200/70">
            항해플러스에서는 모든 동료들이 함께 목적지를 찾아갑니다.
            <br />
            혼자가 아니니까 걱정하지 마세요!
          </p>
        </div>
      </div>
    </div>
  );
};
