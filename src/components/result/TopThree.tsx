import { MousePointerClick } from 'lucide-react';
import { Link } from 'react-router';

import type { User } from '@/apis/users';
import { MatchingDialog } from '@/components/MatchingDialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/elements/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/elements/tooltip';
import { cn } from '@/lib/utils';

interface Props {
  users: User[];
}

const rankingStyle: Record<number, { order: string; gradientColor: string; baseColor: string }> = {
  0: {
    order: 'order-2  scale-130',
    gradientColor: 'from-blue-50/20 via-slate-100/30 to-purple-200',
    baseColor: 'bg-purple-200',
  },
  1: {
    order: 'order-1',
    gradientColor: ' from-blue-50/20 via-slate-100/30 to-sky-200',
    baseColor: 'bg-sky-200',
  },
  2: { order: 'order-3', gradientColor: 'from-blue-50/20 via-slate-100/30 to-rose-200', baseColor: 'bg-rose-200' },
};

export default function TopThree({ users }: Props) {
  return (
    <div className="flex justify-center items-end gap-4 p-8 m-4">
      {users.map((user, index) => (
        <MatchingDialog
          key={user.name}
          renderTrigger={() => (
            <div key={user.name} className={`flex w-24 flex-col items-center ${rankingStyle[index].order}`}>
              {/* 아바타 */}
              <div className="relative">
                <div
                  className={cn(
                    'absolute size-18 rounded-full bg-gradient-to-br shadow-md shadow-slate-300',
                    rankingStyle[index].gradientColor
                  )}
                ></div>
                <Avatar className={'relative w-16 h-16 m-1'}>
                  <AvatarImage src={user.image} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
              </div>
              {/* 순위 배지 */}

              <div className="-mt-4 mb-1 z-1">
                <span
                  className={cn(
                    'inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white rounded-full',
                    rankingStyle[index].baseColor
                  )}
                >
                  {index + 1}
                </span>
              </div>
              {/* 이름 */}
              <div className="mt-1 text-center w-full overflow-hidden">
                <Tooltip>
                  <TooltipTrigger>
                    <Link to={`/result/${user.id}`} className="text-sm hover:underline">
                      {user.name}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent className="flex items-center">
                    {user.name}의 결과보기
                    <MousePointerClick size={12} />
                  </TooltipContent>
                </Tooltip>
                <div className="text-xs text-gray-500 truncate">@{user.id}</div>
              </div>
            </div>
          )}
        />
      ))}
    </div>
  );
}
