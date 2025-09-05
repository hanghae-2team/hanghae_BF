import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

import { getUser } from '@/apis/users';
import kissingCatSrc from '@/assets/images/result/kissing_cat.svg';
import wearyCatSrc from '@/assets/images/result/weary_cat.svg';
import type { MatchingUser } from '@/components/result/MatchingSection';
import MatchingSection from '@/components/result/MatchingSection';
import RollingPaperSection from '@/components/result/RollingPaperSection';
import UserProfile from '@/components/result/UserProfile';
import { Card } from '@/elements/card';
import { Layout } from '@/elements/layout';
import { Separator } from '@/elements/separator';
import { NotFound } from '@/pages/NotFound';

// Mock Data (이후 API로 대체)
const getBest5User = (): MatchingUser[] => [
  {
    id: 'best1',
    name: '찰떡 항해인1',
    image: 'https://picsum.photos/200/300',
    link: 'https://github.com/best1',
    hobbies: [],
  },
  {
    id: 'best2',
    name: '찰떡 항해인2',
    image: 'https://picsum.photos/200/301',
    link: 'https://github.com/best2',
    hobbies: [],
  },
  {
    id: 'best3',
    name: '찰떡 항해인3',
    image: 'https://picsum.photos/200/302',
    link: 'https://github.com/best3',
    hobbies: [],
  },
  {
    id: 'best4',
    name: '찰떡 항해인4',
    image: 'https://picsum.photos/200/303',
    link: 'https://github.com/best4',
    hobbies: [],
  },
  {
    id: 'best5',
    name: '찰떡 항해인5',
    image: 'https://picsum.photos/200/304',
    link: 'https://github.com/best5',
    hobbies: [],
  },
];

const getWorst5User = (): MatchingUser[] => [
  {
    id: 'worst1',
    name: '시루떡 항해인1',
    image: 'https://picsum.photos/200/305',
    link: 'https://github.com/worst1',
    hobbies: [],
  },
  {
    id: 'worst2',
    name: '시루떡 항해인2',
    image: 'https://picsum.photos/200/306',
    link: 'https://github.com/worst2',
    hobbies: [],
  },
  {
    id: 'worst3',
    name: '시루떡 항해인3',
    image: 'https://picsum.photos/200/307',
    link: 'https://github.com/worst3',
    hobbies: [],
  },
  {
    id: 'worst4',
    name: '시루떡 항해인4',
    image: 'https://picsum.photos/200/308',
    link: 'https://github.com/worst4',
    hobbies: [],
  },
  {
    id: 'worst5',
    name: '시루떡 항해인5',
    image: 'https://picsum.photos/200/309',
    link: 'https://github.com/worst5',
    hobbies: [],
  },
];

export const ResultDetail = () => {
  const { id } = useParams();

  const { data: userData, isError } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id!),
    select: (res) => res.data,
    enabled: !!id,
  });

  const best5 = getBest5User();
  const worst5 = getWorst5User();

  if (isError) {
    return <NotFound />;
  }

  return (
    <Layout>
      <Card className="min-h-dvh space-y-8 bg-white/90 p-8 m-4 md:m-8">
        {userData && (
          <>
            <UserProfile userData={userData} />
            <Card className="flex flex-col gap-4 p-8 lg:flex-row">
              <div className="my-8 grow">
                <h2 className="font-PyeongchangPeace text-2xl font-bold mb-4 text-center  flex justify-center items-center">
                  <img src={kissingCatSrc} alt="클로버 이모지" className="inline ml-2" width={32} height={32} />
                  찰떡궁합
                </h2>
                <Separator />
                <MatchingSection title="찰떡 궁합" users={best5} />
              </div>
              <div className="my-8 grow">
                <h2 className="font-PyeongchangPeace text-2xl font-bold mb-4  flex justify-center items-center">
                  <img src={wearyCatSrc} alt="클로버 이모지" className="inline ml-2" width={32} height={32} />
                  시루떡 궁합
                </h2>
                <Separator />
                <MatchingSection title="찰떡 궁합" users={worst5} />
              </div>
            </Card>
            <RollingPaperSection />
          </>
        )}
      </Card>
    </Layout>
  );
};
