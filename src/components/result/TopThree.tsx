import { MousePointerClick } from 'lucide-react';
import { Link } from 'react-router';

import { MatchingDialog } from '@/components/MatchingDialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/elements/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/elements/tooltip';
import { cn } from '@/lib/utils';
import type { MatchResultWithUser } from '@/types/result';

interface Props {
  matchResults: MatchResultWithUser[];
}

const rankingStyle: Record<number, { order: string; gradientColor: string; baseColor: string; scale: string }> = {
  0: {
    order: 'order-2', // 1등은 가운데
    gradientColor: 'from-yellow-100 via-amber-100 to-orange-200',
    baseColor: 'bg-gradient-to-br from-yellow-400 to-amber-500',
    scale: 'scale-125', // 1등이 가장 크게
  },
  1: {
    order: 'order-1', // 2등은 왼쪽
    gradientColor: 'from-blue-100 via-indigo-100 to-purple-200',
    baseColor: 'bg-gradient-to-br from-blue-400 to-indigo-500',
    scale: 'scale-110', // 2등은 중간 크기
  },
  2: {
    order: 'order-3', // 3등은 오른쪽
    gradientColor: 'from-pink-100 via-rose-100 to-red-200',
    baseColor: 'bg-gradient-to-br from-pink-400 to-rose-500',
    scale: 'scale-100', // 3등은 기본 크기
  },
};

export default function TopThree({ matchResults }: Props) {
  return (
    <div className="flex justify-center items-end gap-6 p-8 m-4">
      {matchResults.map((user, index) => (
        <MatchingDialog
          user={user}
          key={`topthree-${user.name}`}
          renderTrigger={() => (
            <div
              key={user.name}
              className={`flex w-20 sm:w-28 flex-col items-center ${rankingStyle[index].order} ${rankingStyle[index].scale} transition-all duration-300 hover:scale-110`}
            >
              {/* 아바타 */}
              <div className="relative mb-4">
                {/* 글로우 효과 */}
                <div
                  className={cn(
                    'absolute inset-0 rounded-full bg-gradient-to-br shadow-lg',
                    rankingStyle[index].gradientColor
                  )}
                  style={{
                    width: index === 0 ? '80px' : '70px',
                    height: index === 0 ? '80px' : '70px',
                    filter: 'blur(8px)',
                    opacity: 0.6,
                  }}
                />

                {/* 아바타 */}
                <Avatar className={`relative border-3 border-white shadow-xl ${index === 0 ? 'size-18' : 'size-16'}`}>
                  <AvatarImage src={user.image} />
                  <AvatarFallback className="text-sm font-semibold">{user.name}</AvatarFallback>
                </Avatar>

                {/* 순위 배지 */}
                <div className="absolute -top-2 -right-2 z-10">
                  <div
                    className={cn(
                      'inline-flex items-center justify-center text-sm font-bold text-white rounded-full shadow-lg border-2 border-white',
                      rankingStyle[index].baseColor,
                      index === 0 ? 'w-9 h-9' : 'w-8 h-8'
                    )}
                  >
                    {index + 1}
                  </div>
                </div>
              </div>

              {/* 이름과 정보 */}
              <div className="text-center w-full overflow-hidden space-y-2">
                <Tooltip>
                  <TooltipTrigger>
                    <Link
                      to={`/result/${user.id}`}
                      className={`font-semibold hover:underline block truncate ${index === 0 ? 'text-base' : 'text-sm'}`}
                    >
                      {user.name}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent className="flex items-center">
                    {user.name}의 결과보기
                    <MousePointerClick size={12} />
                  </TooltipContent>
                </Tooltip>
                <div className="text-xs text-gray-500 truncate">@{user.id}</div>

                {/* 점수 표시 */}
                <div className="mt-2">
                  <div
                    className={cn(
                      'inline-flex items-center px-2 py-1 rounded-full text-xs font-bold text-white',
                      rankingStyle[index].baseColor
                    )}
                  >
                    {user.adjustScore}점
                  </div>
                </div>
              </div>
            </div>
          )}
        />
      ))}
    </div>
  );
}
