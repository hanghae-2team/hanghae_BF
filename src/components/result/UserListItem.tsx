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
  <li className="flex flex-col xs:flex-row  p-2 sm:p-4">
    <div className="w-full flex items-center gap-2 text-left">
      <p className="rounded-full font-bold">{rank}</p>
      <Avatar>
        <AvatarImage src={matchResult.image} />
        <AvatarFallback>{matchResult.name}</AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <Tooltip>
          <TooltipTrigger>
            <Link to={`/result/${matchResult.id}`} className="text-sm hover:underline">
              {matchResult.name}
            </Link>
          </TooltipTrigger>
          <TooltipContent className="flex items-center">
            {matchResult.name}의 결과보기
            <MousePointerClick size={12} />
          </TooltipContent>
        </Tooltip>
        <p className="text-xs text-gray-500">@{matchResult.id}</p>
      </div>
    </div>
    <div className=" flex justify-end sm:justify-start gap-2 shrink-0 mt-2 sm:mt-0">
      <div className="flex flex-col items-center gap-0.5">
        <span className="text-xs text-gray-500">성향</span>
        <div className="size-6 rounded-sm flex items-center justify-center text-xs font-bold bg-blue-50 text-gray-500 shadow-sm">
          {matchResult.personality}
        </div>
      </div>
      <div className="flex flex-col items-center gap-0.5">
        <span className="text-xs text-gray-500">가치관</span>
        <div className="size-6 rounded-sm flex items-center justify-center text-xs font-bold bg-purple-50 text-gray-500 shadow-sm">
          {matchResult.values}
        </div>
      </div>
      <div className="flex flex-col items-center gap-0.5">
        <span className="text-xs text-gray-500">입맛</span>
        <div className="size-6 rounded-sm flex items-center justify-center text-xs font-bold bg-pink-50 text-gray-500 shadow-sm">
          {matchResult.taste}
        </div>
      </div>
      <div className="flex flex-col items-center gap-0.5">
        <span className="text-xs text-gray-500">총점수</span>
        <div className="size-6 rounded-sm flex items-center justify-center text-xs font-bold bg-amber-50 text-gray-500 shadow-sm">
          {matchResult.adjustScore}
        </div>
      </div>
    </div>
  </li>
);

export default MatchListItem;
