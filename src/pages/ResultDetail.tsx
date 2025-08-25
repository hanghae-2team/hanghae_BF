import { ChevronRight, MousePointerClick, PencilLine } from 'lucide-react';
import { Link, useParams } from 'react-router';

import { Avatar, AvatarFallback, AvatarImage } from '@/elements/avatar';
import { Badge } from '@/elements/badge';
import { Button } from '@/elements/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/elements/tooltip';

type UserData = {
  name: string;
  github: string;
  profileImage: string;
  hobbies: string[];
};

export const ResultDetail = () => {
  const { id } = useParams();
  const userData = getMockUserData(id as string);

  const best5: Omit<UserData, 'hobbies'>[] = getBest5User();
  const worst5: Omit<UserData, 'hobbies'>[] = getWorst5User();

  const renderList = (users: Omit<UserData, 'hobbies'>[]) => {
    return (
      <ul className="space-y-4">
        {users.map((user, index) => (
          <li key={`best-${user.name}`} className="flex items-center gap-2">
            <p className="rounded-full font-bold">{index + 1}</p>
            <Avatar>
              <AvatarImage src={user.profileImage} />
              <AvatarFallback>{user.name}</AvatarFallback>
            </Avatar>

            <div className="grow-1">
              <Tooltip>
                <TooltipTrigger>
                  <Link to={`/result/${user.github}`} className="text-sm hover:underline">
                    {user.name}
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="flex items-center">
                  {user.name}의 결과보기
                  <MousePointerClick size={12} />
                </TooltipContent>
              </Tooltip>
              <p className="text-xs text-gray-500">{user.github}</p>
            </div>
            <Button className="bg-gray-800 cursor-pointer">
              <ChevronRight />
            </Button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <div className="p-4 rounded-sm bg-gray-50">
        <div className="flex gap-2 justify-center items-center">
          <Avatar className="size-12">
            <AvatarImage src={userData.profileImage} />
            <AvatarFallback>{userData.name}</AvatarFallback>
          </Avatar>
          <p className="grow">{userData.name}</p>
          <Button
            className="text-black text-sm bg-gray-200 cursor-pointer hover:bg-gray-200 hover:brightness-95 "
            onClick={() => {
              window.alert('롤링 페이퍼 작성');
            }}
          >
            <PencilLine />
            롤링페이퍼 쓰기
          </Button>
        </div>

        <div className="mt-2">
          {userData.hobbies.map((hobby) => (
            <Badge key={`${userData.github}-${hobby}`} className="mr-2">
              {hobby}
            </Badge>
          ))}
        </div>
      </div>
      <div className="p-4 rounded-sm">
        <div className="space-y-8">
          <div className="text-3xl font-bold text-center">찰떡 궁합</div>
          {renderList(best5)}
        </div>
        <div className="space-y-8 mt-8">
          <div className="text-3xl font-bold text-center">시루떡 궁합</div>
          {renderList(worst5)}
        </div>
      </div>
      <div className="p-4 rounded-sm">
        <div className="text-3xl font-bold text-center">롤링페이퍼</div>
        <div className="h-20 text-center text-base text-gray-600 bg-gray-50 rounded-sm leading-20 mt-2">
          수료일에 공개됩니다
        </div>
      </div>
    </div>
  );
};

const getMockUserData = (githubId: string) => ({
  name: `항해인`,
  github: githubId,
  profileImage: 'https://picsum.photos/200',
  hobbies: ['취미1', '취미2', '취미3'],
});

const getBest5User = () => [
  {
    name: `찰떡 항해인1`,
    github: `best1`,
    profileImage: 'https://picsum.photos/200',
  },
  {
    name: `찰떡 항해인2`,
    github: `best2`,
    profileImage: 'https://picsum.photos/200',
  },
  {
    name: `찰떡 항해인3`,
    github: `best3`,
    profileImage: 'https://picsum.photos/200',
  },
  {
    name: `찰떡 항해인4`,
    github: `best4`,
    profileImage: 'https://picsum.photos/200',
  },
  {
    name: `찰떡 항해인5`,
    github: `best5`,
    profileImage: 'https://picsum.photos/200',
  },
];

const getWorst5User = () => [
  {
    name: `시루떡 항해인1`,
    github: `worst1`,
    profileImage: 'https://picsum.photos/200',
  },
  {
    name: `시루떡 항해인2`,
    github: `worst2`,
    profileImage: 'https://picsum.photos/200',
  },
  {
    name: `시루떡 항해인3`,
    github: `worst3`,
    profileImage: 'https://picsum.photos/200',
  },
  {
    name: `시루떡 항해인4`,
    github: `worst4`,
    profileImage: 'https://picsum.photos/200',
  },
  {
    name: `시루떡 항해인5`,
    github: `worst5`,
    profileImage: 'https://picsum.photos/200',
  },
];
