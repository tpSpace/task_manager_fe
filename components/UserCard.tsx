import React from 'react';

interface UserCardProps {
  id: number;
  userName: string;
}
const UserCard = ({ id, userName }: UserCardProps) => {
  return (
    <div className="bg-white rounded-lg p-4 flex items-center justify-center">
      <div className="text-xl">
        {' '}
        {id}
        {userName}
      </div>
    </div>
  );
};

export default UserCard;
