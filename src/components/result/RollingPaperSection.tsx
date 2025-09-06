import cloverSvg from '@/assets/images/result/clover.svg';
import { Card, CardContent, CardHeader } from '@/elements/card';

const RollingPaperSection = () => (
  <Card className="gap-2 bg-gradient-to-br from-amber-50/50 via-orange-50/50 to-yellow-50/50 border-2 border-dashed border-amber-200/50">
    <CardHeader className="text-center pb-4">
      <div className="flex items-center justify-center gap-3 mb-2">
        <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
          <img src={cloverSvg} alt="클로버" className="w-5 h-5" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
          롤링페이퍼
        </h2>
      </div>
    </CardHeader>
    <CardContent className="text-center py-8">
      {/* 메인 메시지 */}
      <div className="space-y-4">
        <div className="relative">
          <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center shadow-lg animate-bounce-slow">
            <div className="text-2xl md:text-3xl">📝</div>
          </div>
          {/* 주변 장식 요소들 */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping opacity-60" />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-orange-400 rounded-full animate-pulse opacity-60" />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg md:text-xl font-semibold text-gray-700">롤링페이퍼는 수료일에 공개됩니다</h3>
          <p className="text-sm md:text-base text-gray-500 max-w-md mx-auto leading-relaxed">
            동료들이 남긴 따뜻한 메시지를
            <br />
            잠시만 기다려주세요
          </p>
        </div>
      </div>

      {/* 장식적인 구분선 */}
      <div className="mt-6 w-20 h-0.5 bg-gradient-to-r from-transparent via-amber-300 to-transparent mx-auto" />
    </CardContent>
  </Card>
);

export default RollingPaperSection;
