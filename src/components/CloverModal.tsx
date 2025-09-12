import confetti from 'canvas-confetti';

import cloverSvg from '@/assets/images/result/clover.svg';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/elements/dialog';
import { USER_NAME } from '@/utils/UserUtils';

interface CloverModalProps {
  userId: string;
  children: React.ReactNode;
}

export const CloverModal = ({ userId, children }: CloverModalProps) => {
  const handleCelebration = () => {
    // 화려한 컨페티 폭죽 효과
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    // 여러 번 발사해서 더 화려한 효과
    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#4ade80', '#22c55e', '#16a34a', '#fbbf24', '#f59e0b'],
    });

    fire(0.2, {
      spread: 60,
      colors: ['#4ade80', '#22c55e', '#16a34a', '#fbbf24', '#f59e0b'],
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ['#4ade80', '#22c55e', '#16a34a', '#fbbf24', '#f59e0b'],
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      colors: ['#4ade80', '#22c55e', '#16a34a', '#fbbf24', '#f59e0b'],
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
      colors: ['#4ade80', '#22c55e', '#16a34a', '#fbbf24', '#f59e0b'],
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2 text-xl">
            <img src={cloverSvg} alt="clover emoji" width="28" height="28" />
            행운의 클로버를 발견했다!
          </DialogTitle>
          <DialogDescription className="sr-only">
            행운의 클로버를 발견한 축하 메시지와 팀 소개, 감사 인사
          </DialogDescription>
          <div className="text-center py-6 space-y-4">
            <div className="text-lg text-gray-700">
              이 특별한 클로버를 찾은 당신의 앞날에
              <br />
              <span className="text-green-600 font-semibold">무한한 행운이 함께하길!</span> 🍀
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-100 mx-2">
              <div className="text-sm text-green-700 leading-relaxed">
                ✨ 작은 발견이 큰 변화의 시작이 되듯
                <br />
                이 시작과 경험들이
                <br />
                <strong>당신의 큰 꿈을 현실</strong>로 만들어가길 바라요
              </div>
            </div>

            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg mx-2">
              <p>🎉 {USER_NAME[userId]}님! 10주간의 여정 고생 많으셨습니다!</p>
              <p className="mt-2">더 넓은 바다로 나아가는</p>
              <strong>{USER_NAME[userId]}님만의 항해를 시작하세요</strong>
              <div className="text-xs text-gray-500 italic mt-2">&quot;행운은 준비된 자에게 찾아온다!&quot;</div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleCelebration}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2"
              >
                <span>🎉</span>
                고생한 자신에게 박수 보내기
                <span>👏</span>
              </button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
