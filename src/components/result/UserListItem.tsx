import { MousePointerClick } from 'lucide-react';
import { Link } from 'react-router';

import { Avatar, AvatarFallback, AvatarImage } from '@/elements/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/elements/tooltip';
import type { MatchResultWithUser } from '@/types/result';

type Props = {
  matchResult: MatchResultWithUser;
  rank: number;
};

const MatchListItem = ({ matchResult, rank }: Props) => (
  <li className="flex flex-col xs:flex-row p-3 sm:p-4 bg-white/40 rounded-lg border border-gray-100/50 hover:bg-white/60 transition-all duration-200">
    <div className="w-full flex items-center gap-3 text-left">
      {/* 순위 */}
      <div className="flex-shrink-0">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
          <span className="text-xs font-bold text-gray-700">{rank}</span>
        </div>
      </div>

      {/* 아바타 */}
      <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
        <AvatarImage src={matchResult.image} />
        <AvatarFallback className="text-xs font-medium">{matchResult.name}</AvatarFallback>
      </Avatar>

      {/* 사용자 정보 */}
      <div className="flex-1 min-w-0">
        <Tooltip>
          <TooltipTrigger>
            <Link to={`/result/${matchResult.id}`} className="text-sm font-medium hover:underline block truncate">
              {matchResult.name}
            </Link>
          </TooltipTrigger>
          <TooltipContent className="flex items-center">
            {matchResult.name}의 결과보기
            <MousePointerClick size={12} />
          </TooltipContent>
        </Tooltip>
        <p className="text-xs text-gray-500 truncate">@{matchResult.id}</p>
      </div>
    </div>

    {/* 점수 정보 */}
    <div className="flex justify-end sm:justify-start gap-2 shrink-0 mt-3 sm:mt-0">
      <div className="flex flex-col items-center gap-1">
        <span className="text-xs text-gray-500">성향</span>
        <div className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700">
          {matchResult.personality}
        </div>
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="text-xs text-gray-500">가치관</span>
        <div className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700">
          {matchResult.values}
        </div>
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="text-xs text-gray-500">입맛</span>
        <div className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold bg-gradient-to-br from-pink-100 to-pink-200 text-pink-700">
          {matchResult.taste}
        </div>
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="text-xs text-gray-500">총점</span>
        <div className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold bg-gradient-to-br from-amber-100 to-amber-200 text-amber-700">
          {matchResult.adjustScore}
        </div>
      </div>
    </div>
  </li>
);

export default MatchListItem;
