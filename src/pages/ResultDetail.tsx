import { ChevronRight, MousePointerClick, PencilLine } from 'lucide-react';
import { Link, useParams } from 'react-router';

import cloverSvg from '@/assets/result/clover.svg';
import TopThree from '@/components/result/TopThree';
import usersRawData from '@/data/users.json';
import { Avatar, AvatarFallback, AvatarImage } from '@/elements/avatar';
import { Badge } from '@/elements/badge';
import { Button } from '@/elements/button';
import { Card, CardContent, CardHeader } from '@/elements/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/elements/tooltip';
import { findUserById } from '@/utils/UserUtils';
type UserData = {
  name: string;
  github: string;
  profileImage: string;
  hobbies: string[];
};

export const ResultDetail = () => {
  const { id } = useParams();

  const userData = findUserById(usersRawData, id);

  const best5: Omit<UserData, 'hobbies'>[] = getBest5User();
  const worst5: Omit<UserData, 'hobbies'>[] = getWorst5User();

  const renderList = (users: Omit<UserData, 'hobbies'>[], startRank: number = 1) => {
    return (
      <ul className="space-y-4">
        {users.map((user, index) => (
          <li key={`best-${user.name}`} className="flex items-center gap-2">
            <p className="rounded-full font-bold">{index + startRank}</p>
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
            <Button className="bg-transparent shadow-none cursor-pointer hover:bg-transparent ">
              <ChevronRight size={20} stroke="#303030" />
            </Button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="space-y-4 p-8 min-h-dvh bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Card>
        <CardContent>
          <div className="flex gap-2 justify-center items-center">
            <Avatar className="size-12">
              <AvatarImage src={userData.image} />
              <AvatarFallback>{userData.name}</AvatarFallback>
            </Avatar>
            <div className="grow">
              <p className="text-bold">{userData.name}</p>
              <a href={userData.link} target="_blank" rel="noopener noreferrer">
                <p className="text-xs text-gray-700 hover:underline">@{userData.id}</p>
              </a>
            </div>

            <Button
              className="text-white text-sm bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 cursor-pointer  hover:brightness-95 "
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
              <Badge key={`${userData.id}-${hobby}`} className="bg-gray-700 mr-2">
                {hobby}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="rounded-sm flex gap-4 flex-col md:flex-row space-y-4 md:space-y-0">
        <Card className="grow-1">
          <CardContent>
            <div className="text-2xl font-bold">찰떡 궁합</div>
            <TopThree users={best5.slice(2)} />
            {renderList(best5.slice(3, 5), 4)}
          </CardContent>
        </Card>
        <Card className="grow-1">
          <CardContent>
            <div className="text-2xl font-bold">시루떡 궁합</div>
            <TopThree users={worst5.slice(2)} />
            {renderList(worst5.slice(3, 5), 4)}
          </CardContent>
        </Card>
      </div>
      <Card className="gap-2">
        <CardHeader>
          <div className="text-2xl font-bold ">롤링페이퍼</div>
        </CardHeader>
        <CardContent className="text-center m-8">
          수료일에 공개됩니다{'\n'}잠시만 기다려주세요
          <img src={cloverSvg} alt="클로버 이모지" className="inline" width={24} height={24} />
        </CardContent>
      </Card>
    </div>
  );
};

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
