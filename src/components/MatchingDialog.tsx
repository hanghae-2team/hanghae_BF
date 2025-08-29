import { type ReactNode, useState } from 'react';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/elements/dialog';

import { ComparisonRadarChart } from './RadarChart';

interface UserData {
  name: string;
  taste: number; // 입맛 (0-100)
  values: number; // 가치관 (0-100)
  personality: number; // 성향 (0-100)
}

// Mock 데이터
const DUMMY_USER1_DATA: UserData = {
  name: '김항해',
  taste: 85, // 매운 음식을 좋아함
  values: 75, // 진취적이고 도전적
  personality: 90, // 외향적이고 활발함
};

const DUMMY_USER2_DATA: UserData = {
  name: '김르탄',
  taste: 60, // 단맛을 선호
  values: 95, // 안정적이고 신중함
  personality: 70, // 내향적이지만 따뜻함
};

interface Props {
  renderTrigger: () => ReactNode;
}

export const MatchingDialog = ({ renderTrigger }: Props) => {
  const [isMatchingOpen, setIsMatchingOpen] = useState(false);

  // 궁합 점수 계산
  const calculateCompatibility = (user1: UserData, user2: UserData) => {
    const tasteDiff = Math.abs(user1.taste - user2.taste);
    const valuesDiff = Math.abs(user1.values - user2.values);
    const personalityDiff = Math.abs(user1.personality - user2.personality);
    const averageDiff = (tasteDiff + valuesDiff + personalityDiff) / 3;
    const compatibilityScore = Math.round(100 - averageDiff);

    return Math.max(compatibilityScore, 0);
  };

  const compatibilityScore = calculateCompatibility(DUMMY_USER1_DATA, DUMMY_USER2_DATA);

  return (
    <Dialog open={isMatchingOpen} onOpenChange={setIsMatchingOpen}>
      <DialogTrigger asChild className="cursor-pointer">
        {renderTrigger()}
        {/* <Button>매칭 모달 임시 버튼</Button> */}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto overflow-x-hidden" style={{ scrollbarWidth: 'none' }}>
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            {DUMMY_USER1_DATA.name}님과 {DUMMY_USER2_DATA.name}님의 궁합
          </DialogTitle>
          <DialogDescription className="sr-only"></DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* 궁합 점수 */}
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">{compatibilityScore}점</div>
            <div className="text-muted-foreground">
              {compatibilityScore >= 80
                ? '환상의 궁합!'
                : compatibilityScore >= 60
                  ? '좋은 궁합입니다!'
                  : compatibilityScore >= 40
                    ? '괜찮은 궁합이에요.'
                    : '서로 다른 매력이 있어요.'}
            </div>
          </div>

          {/* 차트 영역 */}
          <div>
            <h3 className="text-lg font-semibold text-center">성향 비교 차트</h3>
            <ComparisonRadarChart user1Data={DUMMY_USER1_DATA} user2Data={DUMMY_USER2_DATA} />
          </div>

          {/* 상세 분석 */}
          <div className="bg-gray-100 rounded-lg space-y-3 w-full p-4">
            <h4 className="font-semibold">상세 분석</h4>
            <div className=" grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium">입맛:</span>{' '}
                <span className="text-muted-foreground">
                  {Math.abs(DUMMY_USER1_DATA.taste - DUMMY_USER2_DATA.taste) <= 20 ? '비슷한 취향' : '서로 다른 취향'}
                </span>
              </div>
              <div>
                <span className="font-medium">가치관:</span>{' '}
                <span className="text-muted-foreground">
                  {Math.abs(DUMMY_USER1_DATA.values - DUMMY_USER2_DATA.values) <= 20 ? '비슷한 가치관' : '상호 보완적'}
                </span>
              </div>
              <div>
                <span className="font-medium">성향:</span>{' '}
                <span className="text-muted-foreground">
                  {Math.abs(DUMMY_USER1_DATA.personality - DUMMY_USER2_DATA.personality) <= 20
                    ? '비슷한 성향'
                    : '균형잡힌 조합'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
