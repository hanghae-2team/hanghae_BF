import { PencilLine } from 'lucide-react';

import type { User } from '@/apis/users';
import { Avatar, AvatarFallback, AvatarImage } from '@/elements/avatar';
import { Badge } from '@/elements/badge';
import { Button } from '@/elements/button';
import { HOBBIES } from '@/utils/hobbyUtils';

const mapHobbyIdsToNames = (id: string): string => {
  return HOBBIES.find((hobby) => hobby.id === id)?.name || '';
};

type Props = {
  userData: User;
  onClickRollingPaper: () => void;
};

const UserProfile = ({ userData, onClickRollingPaper }: Props) => (
  <section>
    <div className="flex gap-2 justify-center items-center">
      <Avatar className="size-12">
        <AvatarImage src={userData.image} />
        <AvatarFallback>{userData.name}</AvatarFallback>
      </Avatar>

      <div className="grow text-left">
        <p className="font-bold">{userData.name}</p>
        <a href={userData.link} target="_blank" rel="noopener noreferrer">
          <p className="text-xs text-gray-700 hover:underline">@{userData.id}</p>
        </a>
      </div>

      <Button
        className="text-white text-sm bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 hover:brightness-95"
        onClick={onClickRollingPaper}
      >
        <PencilLine />
        롤링페이퍼 쓰기
      </Button>
    </div>

    {userData.hobbies && (
      <div className="mt-2 text-left">
        {userData.hobbies.map((hobby: string) => (
          <Badge key={`${userData.id}-${hobby}`} className="bg-gray-700 mr-2">
            {mapHobbyIdsToNames(hobby)}
          </Badge>
        ))}
      </div>
    )}
  </section>
);

export default UserProfile;
