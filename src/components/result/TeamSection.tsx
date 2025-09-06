import { Link } from 'react-router';

import type { User } from '@/apis/users';
import { Avatar, AvatarFallback, AvatarImage } from '@/elements/avatar';

interface TeamSectionProps {
  teamName: string;
  users: User[];
}

export const TeamSection = ({ teamName, users }: TeamSectionProps) => {
  return (
    <div className="mb-8">
      {/* Team 헤더 */}
      <div className="mb-4">
        <h2 className="font-PyeongchangPeace text-xl md:text-2xl font-bold text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          {teamName}
        </h2>
        <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mt-2"></div>
      </div>

      {/* 사용자 그리드 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-4">
        {users.map((user) => {
          return (
            <Link to={user.id} key={user.id}>
              <div className="group w-full flex justify-start items-center gap-4 p-2 overflow-hidden rounded-lg border bg-white/80 shadow-sm shadow-zinc-200 animate-fade-up transition-transform duration-150 ease-out hover:scale-105">
                <Avatar className="size-12 sm:size-20 rounded-md">
                  <AvatarImage src={user.image} />
                  <AvatarFallback>{user.name}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="text-left md:text-base font-bold transition-colors group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 group-hover:bg-clip-text">
                    {user.name}
                  </div>
                  <div className="text-xs md:text-sm text-gray-500 truncate">@{user.id}</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
