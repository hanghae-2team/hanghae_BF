type User = {
  name: string;
  id: string;
  image: string;
  link: string;
};

type UserRawData = {
  [key: string]: User;
};

export const convertRawDataToUsers = (rawData: UserRawData): User[] => {
  return Object.values(rawData).map((user) => ({
    name: user.name || '',
    id: user.id || '',
    image: user.image || '',
    link: user.link || '',
  }));
};

export const findUserById = (rawData: UserRawData, id?: string) => {
  if (!id) throw Error('');
  const user = rawData[id];
  if (user) return { ...user, hobbies: ['1', '2', '3'] };
  throw Error('유저가 없습니다.');
};
