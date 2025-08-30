import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

import { getUser } from '@/apis/users';
import type { MatchingUser } from '@/components/result/MatchingSection';
import MatchingSection from '@/components/result/MatchingSection';
import RollingPaperSection from '@/components/result/RollingPaperSection';
import UserProfile from '@/components/result/UserProfile';

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

  const {
    data: userData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id!),
    select: (res) => res.data,
    enabled: !!id,
  });

  const best5 = getBest5User();
  const worst5 = getWorst5User();

  const handleClickRollingPaper = () => {
    window.alert('롤링페이퍼 작성');
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;
  if (!userData) return <div>User not found</div>;

  return (
    <div className="space-y-4 p-8 min-h-dvh bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <UserProfile userData={userData} onClickRollingPaper={handleClickRollingPaper} />

      <div className="flex flex-col gap-4 md:flex-row">
        <MatchingSection title="찰떡 궁합" users={best5} />
        <MatchingSection title="시루떡 궁합" users={worst5} />
      </div>

      <RollingPaperSection />
    </div>
  );
};
