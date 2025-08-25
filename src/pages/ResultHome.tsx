import { Link } from 'react-router';

import { Avatar, AvatarFallback, AvatarImage } from '@/elements/avatar';

export const ResultHome = () => {
  return (
    <div className="min-w-xs w-full my-4 mx-auto border rounded-sm inset-0 flex flex-wrap gap-4 p-6">
      {MOCK_DATAS.map((data) => (
        <Link to={data.github} key={data.key}>
          <div className="flex flex-col w-24 justify-center items-center p-4 bg-amber-100">
            <Avatar className="size-12">
              <AvatarImage src={data.profileImage} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="font-bold">{data.name}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

const MOCK_DATAS = Array.from({ length: 58 }).map((_, index) => ({
  key: index,
  name: `항해인${index}`,
  github: `hanghae${index}`,
  profileImage: 'https://picsum.photos/200',
}));
