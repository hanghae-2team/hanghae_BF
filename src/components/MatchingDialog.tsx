import { useQuery } from '@tanstack/react-query';
import { Star } from 'lucide-react';
import { type ReactNode, useState } from 'react';
import { useParams } from 'react-router';

import { getSurveyResult } from '@/apis/surveys';
import { getUser } from '@/apis/users';
import matchText from '@/assets/result/match-text.json';
import { ComparisonRadarChart } from '@/components/ComparisonRadarChart';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/elements/dialog';
import type { MatchResultWithUser } from '@/types/result';
import { type ChartWithUserData, convertSurveyToChartData } from '@/utils/chartUtils';

interface MatchText {
  total: number;
  id: string;
  title: string;
  values: string;
  personality: string;
  taste: string;
}

type MatchTextData = Record<string, MatchText[]>;

interface Props {
  renderTrigger: () => ReactNode;
  user: MatchResultWithUser;
}

export const MatchingDialog = ({ renderTrigger, user }: Props) => {
  const { id } = useParams();
  const [isMatchingOpen, setIsMatchingOpen] = useState(false);

  const { data: userData } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id!),
    select: (res) => res.data,
    enabled: !!id,
  });
  // 현재 사용자의 설문 데이터

  const { data: currentUserSurvey } = useQuery({
    queryKey: ['survey', id],
    queryFn: () => getSurveyResult(id!),
    select: (res) => res.data,
    enabled: !!id,
  });

  // 상대방의 설문 데이터
  const { data: targetUserSurvey } = useQuery({
    queryKey: ['survey', user.id],
    queryFn: () => getSurveyResult(user.id),
    select: (res) => res.data,
    enabled: !!user.id,
  });

  if (!currentUserSurvey || !targetUserSurvey || !userData) {
    return null;
  }

  const currentUserChartData: ChartWithUserData = {
    ...convertSurveyToChartData(currentUserSurvey, userData.name),
    id: userData?.id,
    image: userData?.image,
    link: userData?.link,
    adjustScore: user.adjustScore,
  };
  const targetUserChartData: ChartWithUserData = {
    ...convertSurveyToChartData(targetUserSurvey, user.name),
    id: user.id,
    image: user.image,
    link: user.link,
    adjustScore: user.adjustScore,
  };

  const matchTextData = (matchText as MatchTextData)[userData.id].find((item) => user.id === item.id);

  return (
    <Dialog open={isMatchingOpen} onOpenChange={setIsMatchingOpen}>
      <DialogTrigger asChild className="cursor-pointer">
        {renderTrigger()}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto overflow-x-hidden" style={{ scrollbarWidth: 'none' }}>
        <DialogHeader>
          <DialogTitle className="text-center text-xl flex items-center justify-center gap-2">
            {userData?.name}님과 {user.name}님의 궁합
          </DialogTitle>
          <DialogDescription className="sr-only"></DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* 궁합 점수 */}
          <div className="text-center p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-200">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-600">궁합 점수</span>
            </div>
            <div className="text-3xl font-bold text-primary mb-2">{user.adjustScore}점</div>
            <div className="text-muted-foreground text-sm bg-white/60 px-3 py-1 rounded-full inline-block">
              {matchTextData?.title}
            </div>
          </div>

          {/* 차트 영역 */}
          <div className="bg-gray-50 rounded-lg p-4">
            <ComparisonRadarChart
              currentUserChartData={currentUserChartData}
              targetUserChartData={targetUserChartData}
            />
          </div>

          {/* 상세 분석 */}
          <div className="bg-gradient-to-br from-gray-100 to-pink-50 rounded-lg space-y-4 w-full p-4">
            <h4 className="font-semibold text-xl flex items-center gap-2">상세 분석</h4>
            <div className="flex flex-col space-y-4 text-sm">
              <div className="flex flex-col gap-1 bg-white/60 p-3 rounded-lg">
                <p className="font-medium text-lg text-purple-700">가치관</p>
                <p className="text-gray-700">{matchTextData?.values}</p>
              </div>
              <div className="flex flex-col gap-1 bg-white/60 p-3 rounded-lg">
                <p className="font-medium text-lg text-blue-700">성향</p>
                <p className="text-gray-700">{matchTextData?.personality}</p>
              </div>
              <div className="flex flex-col gap-1 bg-white/60 p-3 rounded-lg">
                <span className="font-medium text-lg text-pink-700">입맛</span>
                <span className="text-gray-700">{matchTextData?.taste}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
