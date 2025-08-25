import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

import { Avatar, AvatarFallback, AvatarImage } from '@/elements/avatar';

export const ResultHome = () => {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-center">✨매칭결과✨</h1>
      <Link to={''} className="font-bold flex rounded-sm p-2 bg-linear-65 from-sky-200 to-sky-100 text-gray-700 ">
        내 결과 보러가기 <ChevronRight strokeWidth={1.5} />
      </Link>
      <div className="my-4 mx-auto grid grid-cols-4 sm:grid-cols-6 gap-y-4 gap-x-2">
        {MOCK_DATAS.map((data) => (
          <Link to={data.github} key={data.key}>
            <div className="group w-full flex flex-col justify-center items-center p-4 rounded-sm border bg-gray-50 shadow-zinc-100 animate-fade-up transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-md ">
              <Avatar className="size-10 sm:size-12 ">
                <AvatarImage src={data.profileImage} />
                <AvatarFallback>{data.name}</AvatarFallback>
              </Avatar>
              <div className="font-bold group-hover:text-sky-600">{data.name}</div>
              <div className="text-xs ">{data.github}</div>
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
