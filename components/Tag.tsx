import React from 'react';

import { TagProps } from '@/types';

interface TagDetailProps {
  tags: TagProps[];
  handleSelect: (selected: string) => void;
}

const Tag: React.FC<TagDetailProps> = ({ tags, handleSelect }) => {
  return (
    <select onChange={(e) => handleSelect(e.target.value)}>
      <option value="">Select a tag</option>
      {/* Asking if the array existed */}
      {tags && tags.map((tag, index) => (
        <option key={index} value={tag.title}>
          {tag.title}
        </option>
      ))}
      {/* Asking if the array was empty */}
      {/* {tags?.map((tag, index) => (
        <option key={index} value={tag.title}>
          {tag.title}
        </option>
      ))} */}
      {/* Asking if the array was null */}
      {/* {tags.map((tag, index) => (
        <option key={index} value={tag.title}>
          {tag.title}
        </option>
      ))} */}
    </select>
  );
};

export default Tag;
