import { useQuery } from '@tanstack/react-query';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

import { getAllUsers } from '@/apis/users';
import cloverSvg from '@/assets/images/result/clover.svg';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/elements/avatar';
import { Layout } from '@/elements/layout';
import { convertRawDataToUsers } from '@/utils/UserUtils';

export const ResultHome = () => {
  const { user: currentUser } = useAuth();
  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
    placeholderData: {},
    staleTime: 5 * 60 * 1000, // 분
  });

  const users = data ? convertRawDataToUsers(data) : [];

  return (
    <Layout>
      <div className="max-w-7xl min-h-dvh mx-auto">
        <div className="mt-8 mb-4 lg:mb-6 flex items-center justify-center">
          <div className="relative inline-block">
            {/* 글로우 효과 */}
            <div className="absolute inset-0 text-5xl sm:text-6xl lg:text-7xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent blur-sm opacity-50">
              항해에서 BF찾기
            </div>
            {/* 메인 숫자 */}
            <h1 className="relative text-5xl sm:text-6xl lg:text-7xl  font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              항해에서 BF찾기
            </h1>
          </div>
        </div>

        <div className="text-center text-base md:text-md text-purple-100/80  whitespace-pre-line ">
          <img src={cloverSvg} alt="clover emoji" width="24" height="24" className="inline" />
          결과 공개까지 기다려주셔서 정말 감사합니다!
          <img src={cloverSvg} alt="clover emoji" width="24" height="24" className="inline" />
          {'\n'} 항해인 중 나랑 찰떡궁합인 사람들은 과연 누구일까요?
        </div>

        <div className="flex justify-end mt-4 mb-8 md:my-8 px-8 lg:px-0">
          <Link
            to={`/result/${currentUser?.id}`}
            className="bg-black rounded-full w-fit px-2 py-1 flex items-center text-sm sm:text-base md:text-base  text-white/75"
          >
            내 항해 궁합 보러가기
            <ChevronRight size={16} />
          </Link>
        </div>

        <div className="mx-auto grid grid-cols-2 md:grid-cols-3 px-8 lg:px-0 lg:grid-cols-4 gap-y-4 gap-x-4">
          {Object.values(users).map((user) => (
            <Link to={user.id} key={user.id}>
              <div className="group w-full flex justify-start items-center gap-4  p-2 overflow-hidden rounded-lg border bg-white/80 shadow-sm shadow-zinc-200 animate-fade-up transition-transform duration-300 ease-out hover:scale-105 ">
                <Avatar className="size-12 sm:size-20 rounded-md">
                  <AvatarImage src={user.image} />
                  <AvatarFallback>{user.name}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="text-left md:text-base font-bold transition-colors group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 group-hover:bg-clip-text ">
                    {user.name}
                  </div>
                  <div className="text-xs md:text-sm text-gray-500 truncate">@{user.id}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};
