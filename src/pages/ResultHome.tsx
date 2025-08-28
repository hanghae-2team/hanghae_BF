import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

import cloverSvg from '@/assets/result/clover.svg';
import { Avatar, AvatarFallback, AvatarImage } from '@/elements/avatar';

export const ResultHome = () => {
  return (
    <div className="p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="p-6 md:p-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl  border border-blue-100 shadow-lg">
          <span className="text-base md:text-lg text-gray-800  whitespace-pre-line ">
            <img src={cloverSvg} alt="clover emoji" width="24" height="24" className="inline" />
            결과 공개까지 기다려주셔서 정말 감사합니다!
            <img src={cloverSvg} alt="clover emoji" width="24" height="24" className="inline" />
            {'\n'} 항해인 중 나랑 찰떡궁합인 사람들은 과연 누구일까요?
          </span>
          <Link to={'/result/someone'} className="mt-8 flex items-center justify-end animate-bounce ">
            <span className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-br  from-blue-500 to-purple-900 font-extrabold ">
              내 항해 궁합 보러가기
            </span>
            <ChevronRight className="text-purple-900" strokeWidth={3} />
          </Link>
        </div>

        <div className="my-4 mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-4">
          {MOCK_DATAS.map((data) => (
            <Link to={data.github} key={data.key}>
              <div className="group w-full flex justify-start gap-4 items-center p-4 rounded-sm border bg-white shadow-sm shadow-zinc-200 animate-fade-up transition-transform duration-300 ease-out hover:scale-105 hover:shadow-xl">
                <Avatar className="size-16 sm:size-20 rounded-md">
                  <AvatarImage src={data.profileImage} />
                  <AvatarFallback>{data.name}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="md:text-base font-bold transition-colors group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 group-hover:bg-clip-text ">
                    {data.name}
                  </div>
                  <div className="text-xs md:text-sm text-gray-500">@{data.github}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
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
