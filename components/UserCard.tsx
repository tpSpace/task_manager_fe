import React from 'react';

import { UserProps } from '@/types';

interface UserCardProps {
  user: UserProps;
}
const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="bg-white rounded-lg p-4 flex items-center justify-center">
      <div className="text-xl">
        {' '}
        {} {user.userName}
      </div>
    </div>
  );
};

export default UserCard;
