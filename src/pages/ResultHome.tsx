import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

import { Avatar, AvatarFallback, AvatarImage } from '@/elements/avatar';

export const ResultHome = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center">결과보기</h1>
      <Link to={''} className="font-bold flex bg-gray-200 rounded-sm p-2">
        내 결과 보러가기 <ChevronRight />
      </Link>
      <div className="min-w-xs w-full my-4 mx-auto border rounded-sm inset-0 flex flex-wrap gap-4 p-6">
        {MOCK_DATAS.map((data) => (
          <Link to={data.github} key={data.key}>
            <div className="flex flex-col w-24 justify-center items-center p-4">
              <Avatar className="size-12">
                <AvatarImage src={data.profileImage} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="font-bold">{data.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const MOCK_DATAS = Array.from({ length: 58 }).map((_, index) => ({
  key: index,
  name: `항해인${index}`,
  github: `hanghae${index}`,
  profileImage: 'https://picsum.photos/200',
}));
