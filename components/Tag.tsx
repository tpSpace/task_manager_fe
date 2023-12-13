import React from 'react';

import { TagProps } from '@/types';

interface TagDetailProps {
  tag: TagProps;
}

const Tag = ({ tag }: TagDetailProps) => {
  return <div>{tag.title}</div>;
};

export default Tag;
