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
