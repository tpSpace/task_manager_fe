import { UserProps } from '@/types';
import React from 'react';

interface UserCardProps {
  user: UserProps;
}
const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="bg-white rounded-lg p-4 flex items-center justify-center">
      <div className="text-xl">
        {' '}
        {user.id} {user.userName}
      </div>
    </div>
  );
};

export default UserCard;
