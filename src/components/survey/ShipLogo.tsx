import shipSvg from '@/assets/survey/ship.svg';
export const ShipLogo = () => {
  return (
    <div className="relative inline-block p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full mb-6 shadow-lg overflow-hidden">
      {/* 메인 파도 - 물결 확실하게 */}
      <div className="absolute bottom-0 left-0 right-0 h-40">
        <svg className="w-full h-full" viewBox="0 0 64 160" preserveAspectRatio="none">
          <path
            d="M0 130 Q8 122, 16 130 Q24 138, 32 130 Q40 122, 48 130 Q56 138, 64 130 L64 160 L0 160 Z"
            fill="#a0c9ff"
            className="animate-wave"
          />
        </svg>
      </div>

      {/* 두 번째 파도 - 더 작은 물결 */}
      <div className="absolute bottom-0 left-0 right-0 h-38">
        <svg className="w-full h-full" viewBox="0 0 64 152" preserveAspectRatio="none">
          <path
            d="M0 124 Q8 116, 16 124 Q24 132, 32 124 Q40 116, 48 124 Q56 132, 64 124 L64 152 L0 152 Z"
            fill="#103ed7"
            className="animate-wave animation-delay-500"
          />
        </svg>
      </div>

      {/* 세 번째 파도 - 가장 작은 물결 */}
      <div className="absolute bottom-0 left-0 right-0 h-36">
        <svg className="w-full h-full" viewBox="0 0 64 144" preserveAspectRatio="none">
          <path
            d="M0 118 Q8 110, 16 118 Q24 126, 32 118 Q40 110, 48 118 Q56 126, 64 118 L64 144 L0 144 Z"
            fill="#2079ed"
            className="animate-wave animation-delay-1000"
          />
        </svg>
      </div>

      {/* 파도 하이라이트 - 물결 반사 */}
      <div className="absolute bottom-0 left-0 right-0 h-42">
        <svg className="w-full h-full" viewBox="0 0 64 168" preserveAspectRatio="none">
          <path
            d="M0 133 Q8 125, 16 133 Q24 141, 32 133 Q40 125, 48 133 Q56 141, 64 133 L64 168 L0 168 Z"
            fill="white"
            opacity="0.3"
            className="animate-wave animation-delay-300"
          />
        </svg>
      </div>

      <img src={shipSvg} alt="항해 배" className="relative z-10 w-16 h-16 mx-auto" />
    </div>
  );
};
