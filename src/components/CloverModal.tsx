import cloverSvg from '@/assets/images/result/clover.svg';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/elements/dialog';
import { USER_NAME } from '@/utils/UserUtils';

interface CloverModalProps {
  userId: string;
  children: React.ReactNode;
}

export const CloverModal = ({ userId, children }: CloverModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2 text-xl">
            <img src={cloverSvg} alt="clover emoji" width="28" height="28" />
            행운의 클로버를 발견했다!
          </DialogTitle>
          <DialogDescription className="text-center py-6 space-y-4">
            <div className="text-lg text-gray-700">
              이 특별한 클로버를 찾은 당신의 앞날에
              <br />
              <span className="text-green-600 font-semibold">무한한 행운이 함께하길!</span> 🍀
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-100 mx-2">
              <p className="text-sm text-green-700 leading-relaxed">
                ✨ 작은 발견이 큰 변화의 시작이 되듯
                <br />
                이 시작과 경험들이
                <br />
                <strong>당신의 큰 꿈을 현실</strong>로 만들어가길 바라요
              </p>
            </div>

            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg mx-2">
              🎉 {USER_NAME[userId]}님! 10주간의 여정 고생 많으셨습니다!
              <br />더 넓은 바다로 나아가는 <strong>{USER_NAME[userId]}님만의 항해를 시작하세요</strong>
              <div className="text-xs text-gray-500 italic mt-2">&quot;행운은 준비된 자에게 찾아온다!&quot;</div>
            </div>

            <button className="w-full bg-green-500 text-white p-2 rounded-md">고생한 자신에게 박수 보내기</button>

            <div>
              항해에서 베프 찾기를 즐겨주셔서 감사합니다!
              <div>짧막한 비하인드!</div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
