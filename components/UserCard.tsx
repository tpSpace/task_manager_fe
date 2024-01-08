import React from 'react';

import { UserProps } from '@/types';

interface UserCardProps {
  user: UserProps;
}
const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="border-2 border-neutral-400 rounded-xl h-10 w-full bg-neutral-100 p-4 flex items-center justify-center ">
      <div className="text-lg font-Roboto">{user.name}</div>
    </div>
  );
};

export default UserCard;
