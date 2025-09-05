import { ChevronRight, MousePointerClick } from 'lucide-react';
import { Link } from 'react-router';

import type { MatchingUser } from '@/components/result/MatchingSection';
import { Avatar, AvatarFallback, AvatarImage } from '@/elements/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/elements/tooltip';

const UserListItem = ({ user, rank }: { user: Omit<MatchingUser, 'team'>; rank: number }) => (
  <li className="flex items-center gap-2 text-left bg-white p-4 rounded-lg">
    <p className="rounded-full font-bold">{rank}</p>
    <Avatar>
      <AvatarImage src={user.image} />
      <AvatarFallback>{user.name}</AvatarFallback>
    </Avatar>

    <div className="flex-1">
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
      <p className="text-xs text-gray-500">{user.id}</p>
    </div>

    <ChevronRight size={20} stroke="#303030" />
  </li>
);

export default UserListItem;
