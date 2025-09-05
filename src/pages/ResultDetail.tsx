import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

import { getUser } from '@/apis/users';
import kissingCatSrc from '@/assets/images/result/kissing_cat.svg';
import finalResult from '@/assets/result/final-result.json';
import MatchingSection from '@/components/result/MatchingSection';
import ResultDetailBreadCrumb from '@/components/result/ResultDetailBreadCrumb';
import RollingPaperSection from '@/components/result/RollingPaperSection';
import UserProfile from '@/components/result/UserProfile';
import users from '@/data/users.json';
import { Card } from '@/elements/card';
import { Layout } from '@/elements/layout';
import { Separator } from '@/elements/separator';
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

  if (!surveyResult) {
    return <NotFound />;
  }

  const top10 = surveyResult.top10.map((result) => {
    const userInfo = (users as UsersType)[result.targetId];
    return {
      ...result,
      ...userInfo,
      id: result.targetId,
    };
  });

  if (isError) {
    return <NotFound />;
  }

  return (
    <Layout>
      <ResultDetailBreadCrumb userName={userData?.name} className={'m-4 mb-3 md:m-8 md:mb-3'} />
      <Card className="min-h-dvh space-y-8 bg-white/90 p-3 md:p-8 m-2 mt-3 md:m-8 md:mt-3">
        {userData && (
          <>
            <UserProfile userData={userData} />
            <Card className="flex flex-col gap-4 p-4 md:p-8 lg:flex-row">
              <div className="my-8 grow">
                <h2 className="font-PyeongchangPeace text-2xl font-bold mb-4 text-center  flex justify-center items-center">
                  <img src={kissingCatSrc} alt="클로버 이모지" className="inline ml-2" width={32} height={32} />
                  찰떡궁합
                </h2>
                <Separator />
                <MatchingSection matchResults={top10} />
              </div>
            </Card>
            <RollingPaperSection />
          </>
        )}
      </Card>
    </Layout>
  );
};
