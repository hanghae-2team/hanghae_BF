import last from '@/assets/images/last.png';
import whaleSvg from '@/assets/whale.svg';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/elements/dialog';
interface WhaleModalProps {
  children: React.ReactNode;
}

export const WhaleModal = ({ children }: WhaleModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2 text-xl">
            <img src={whaleSvg} alt="whale emoji" width="28" height="28" />
            고래를 발견했다!
          </DialogTitle>

          <DialogDescription className="sr-only">고래를 발견한 축하 메시지와 팀 소개, 감사 인사</DialogDescription>
          <div className="text-center py-4 space-y-4">
            {/* 메인 메시지 */}
            <div className="text-base text-gray-700 leading-relaxed">
              넓은 바다를 헤엄치는 고래처럼
              <br />
              <span className="text-blue-600 font-semibold">당신만의 무한한 가능성을 향해 나아가세요!</span> 🐋
            </div>

            <div className="text-gray-700 font-medium">항해에서 베프 찾기를 즐겨주셔서 감사드립니다.</div>

            {/* 팀 소개 */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="text-blue-800 font-semibold mb-2">🚢 Made by 2팀</div>
              <div className="text-sm text-blue-700">도은 · 소연 · 진희 · 민기 · 윤우 · 연수 · 채영</div>
            </div>

            {/* Special Thanks */}
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <div className="text-sm font-semibold text-green-800 mb-3">🌟 Special Thanks</div>
              <div className="space-y-1.5 text-sm text-green-700">
                <div>
                  📢 아낌없이 프로젝트 홍보해주신 <span className="font-semibold">영서님</span>
                </div>
                <div>
                  💬 마지막 멘트 제공해주신 <span className="font-semibold">효진님</span>
                </div>
                <div className="text-green-600 font-medium pt-1">감사드립니다.</div>
              </div>
            </div>

            <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
              <div className="text-sm font-semibold text-orange-800 mb-3">비하인드 스토리</div>
              <div className="text-sm text-orange-700 space-y-1">
                <div className="leading-relaxed">
                  <span className="font-semibold">🍍 파인애플 피자 호불호 🍕</span> 조사 결과
                </div>
                <div className="flex justify-center items-center gap-3 py-2">
                  <span className="bg-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">표본 60명</span>
                  <span className="bg-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">31 vs 29</span>
                </div>
                <div className="text-xs text-orange-600">선택지 1: 31명 (51.7%) | 선택지 2: 29명 (48.3%)</div>
              </div>
            </div>

            {/* 마지막 젭 모습 */}
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
              <div className="text-sm font-semibold text-purple-800 mb-3">📸 13일 마지막 젭!</div>
              <div className="flex justify-center">
                <img src={last} alt="마지막 젭 모습" className="rounded-lg shadow-sm max-w-full h-auto" />
              </div>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
