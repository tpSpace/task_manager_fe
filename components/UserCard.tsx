import React from 'react';

import { UserProps } from '@/types';

interface UserCardProps {
  user: UserProps;
}
const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="border-2 border-black rounded-full h-10 w-full bg-slate-400 p-4 flex items-center justify-center ">
      <div className="text-lg"> {user.userName}</div>
    </div>
  );
};

export default UserCard;
