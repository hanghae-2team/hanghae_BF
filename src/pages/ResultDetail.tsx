import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

import { getUser } from '@/apis/users';
import cryFaceSrc from '@/assets/images/result/cry_face.svg';
import kissingCatSrc from '@/assets/images/result/kissing_cat.svg';
import finalResult from '@/assets/result/final-result.json';
import MatchingSection from '@/components/result/MatchingSection';
import ResultDetailBreadCrumb from '@/components/result/ResultDetailBreadCrumb';
import RollingPaperSection from '@/components/result/RollingPaperSection';
import UserProfile from '@/components/result/UserProfile';
import users from '@/data/users.json';
import { Card } from '@/elements/card';
import { Layout } from '@/elements/layout';
import { NotFound } from '@/pages/NotFound';
import type { FinalResultJson, UsersType } from '@/types/result';

export const ResultDetail = () => {
  const { id } = useParams();

  const { data: userData, isError } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id!),
    select: (res) => res.data,
    enabled: !!id,
  });

  const surveyResult = (finalResult as FinalResultJson)[id as string];

  const top10 = surveyResult
    ? surveyResult.top10.map((result) => {
        const userInfo = (users as UsersType)[result.targetId];
        return {
          ...result,
          ...userInfo,
          id: result.targetId,
        };
      })
    : [];

  if (isError) {
    return <NotFound />;
  }

  return (
    <Layout>
      <ResultDetailBreadCrumb userName={userData?.name} className={'m-4 mb-3 md:m-8 md:mb-3'} />
      <Card className="min-h-dvh bg-white/90 p-3 md:p-8 m-2 mt-3 md:m-8 md:mt-3">
        {userData && (
          <>
            <UserProfile userData={userData} />
            {top10.length ? (
              <Card className="gap-6 p-6 md:p-8 bg-gradient-to-br from-pink-50/50 via-purple-50/50 to-blue-50/50 border-2 border-dashed border-pink-200/50 shadow-lg">
                {/* 제목 섹션 */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg">
                      <img src={kissingCatSrc} alt="찰떡궁합" className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                      찰떡궁합
                    </h2>
                  </div>
                  <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-pink-300 to-transparent mx-auto" />
                </div>

                {/* 매칭 결과 */}
                <div className="mt-6">
                  <MatchingSection matchResults={top10} />
                </div>
              </Card>
            ) : (
              <Card className="flex flex-col items-center justify-center p-8 md:p-12 min-h-[400px] bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50 border-2 border-dashed border-blue-200/50">
                {/* 아이콘과 애니메이션 */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center shadow-lg animate-bounce-slow">
                    <img src={cryFaceSrc} alt="설문결과 없음" className="w-12 h-12 md:w-14 md:h-14" />
                  </div>
                  {/* 주변 장식 요소들 */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-300 rounded-full animate-ping opacity-60" />
                  <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-pink-300 rounded-full animate-pulse opacity-60" />
                  <div className="absolute top-1/2 -left-4 w-2 h-2 bg-blue-300 rounded-full animate-bounce opacity-40" />
                </div>

                {/* 메시지 */}
                <div className="text-center space-y-3">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-700 mb-2">설문결과가 없어요</h3>
                  <p className="text-sm md:text-base text-gray-500 max-w-md leading-relaxed">
                    직접 만나서 알아가 보는 건 어떨까요?
                  </p>
                </div>

                {/* 장식적인 구분선 */}
                <div className="mt-8 w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-300 to-transparent" />
              </Card>
            )}
            <RollingPaperSection />
          </>
        )}
      </Card>
    </Layout>
  );
};
