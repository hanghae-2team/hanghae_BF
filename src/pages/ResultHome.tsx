import { useQuery } from '@tanstack/react-query';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';

import { getAllUsers } from '@/apis/users';
import cloverSvg from '@/assets/images/result/clover.svg';
import { TeamSection } from '@/components/result/TeamSection';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/elements/button';
import { Layout } from '@/elements/layout';
import { convertRawDataToUsers, getSortedTeamGroups } from '@/utils/UserUtils';

export const ResultHome = () => {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
    placeholderData: {},
    staleTime: 60 * 60 * 1000, // 분
  });

  const users = data ? convertRawDataToUsers(data) : [];
  const teamGroups = getSortedTeamGroups(users);

  return (
    <Layout>
      <div className="max-w-7xl min-h-dvh mx-auto">
        <div className="mt-8 mb-4 lg:mb-6 flex items-center justify-center">
          <div className="relative inline-block">
            {/* 글로우 효과 */}
            <div className="font-PyeongchangPeace absolute inset-0 text-4xl xs:text-5xl sm:text-6xl lg:text-7xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent blur-sm opacity-50">
              항해에서 BF찾기
            </div>
            {/* 메인 숫자 */}
            <h1 className="font-PyeongchangPeace relative text-4xl xs:test-5xl sm:text-6xl lg:text-7xl  font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              항해에서 BF찾기
            </h1>
          </div>
        </div>

        <div className="text-center text-sm xs:text-base md:text-md text-purple-100/80  whitespace-pre-line ">
          <img src={cloverSvg} alt="clover emoji" width="24" height="24" className="inline" />
          결과 공개까지 기다려주셔서 정말 감사합니다!
          <img src={cloverSvg} alt="clover emoji" width="24" height="24" className="inline" />
          {'\n'} 항해인 중 나랑 찰떡궁합인 사람들은 과연 누구일까요?
        </div>

        <div className="flex justify-end mt-4 mb-8 md:my-8 px-4 lg:px-0">
          <Button
            onClick={() => navigate(`/result/${currentUser?.id}`)}
            className="text-white bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 hover:brightness-95 text-xs sm:text-sm"
          >
            내 항해 궁합 보러가기
            <ChevronRight size={16} />
          </Button>
        </div>

        <div className="px-4 lg:px-0">
          {teamGroups.map(({ teamName, users: teamUsers }) => (
            <TeamSection key={teamName} teamName={teamName} users={teamUsers} />
          ))}
        </div>
      </div>
    </Layout>
  );
};
