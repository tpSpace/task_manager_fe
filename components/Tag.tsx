import React from 'react';

import { TagProps } from '@/types';

interface TagDetailProps {
  tags: TagProps[];
  handleSelect: (selected: string) => void;
  selectedTag: string | null;
}

const Tag: React.FC<TagDetailProps> = ({ tags, handleSelect, selectedTag }) => {
  let sortedTags = tags;
  if (selectedTag) {
    const selectedIndex = tags.findIndex(tag => tag.title === selectedTag);
    if (selectedIndex !== -1) {
      sortedTags = [
        tags[selectedIndex],
        ...tags.slice(0, selectedIndex),
        ...tags.slice(selectedIndex + 1)
      ];
    }
  }
  return (
    <select value={selectedTag || ''} onChange={e => handleSelect(e.target.value)}>
      <option value="">Select a tag</option>
      {sortedTags &&
        sortedTags
          .map((tag) => (
            tag && <option key={tag.title} value={tag.title}>
              {tag.title}
            </option>
        ))}
    </select>
  );
};

export default Tag;
