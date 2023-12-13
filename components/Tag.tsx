import React from 'react';

import { TagProps } from '@/types';

interface TagDetailProps {
  tags: TagProps[];
}

const Tag = ({ tags }: TagDetailProps) => {
  return (
    <div>
      {tags.map((tag, index) => (
        <span key={index}>{tag.title}</span>
      ))}
    </div>
  );
};

export default Tag;
