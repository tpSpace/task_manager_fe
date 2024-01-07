import React from 'react';

import { TagProps } from '@/types';

interface TagDetailProps {
  tags: TagProps[];
  handleSelect: (selected: string) => void;
  selectedTag: string | null;
  loadTicket: () => void;
}

const Tag: React.FC<TagDetailProps> = ({
  tags,
  handleSelect,
  selectedTag,
  loadTicket,
}) => {
  let sortedTags = tags;
  if (selectedTag) {
    const selectedIndex = tags.findIndex(tag => tag.title === selectedTag);
    if (selectedIndex !== -1) {
      sortedTags = [
        tags[selectedIndex],
        ...tags.slice(0, selectedIndex),
        ...tags.slice(selectedIndex + 1),
      ];
    }
  }

  return (
    <select
      className="font-sans text-base text-gray-800 bg-white border-2 border-black rounded-full p-2
        w-full box-border outline-none text-center font-bold mt-1 appearance-none flex clsjustify-center"
      title="Select a tag"
      onChange={e => handleSelect(e.target.value)}
      //onBlur={loadTicket}
      value={selectedTag || ''}
    >
      <option value="">Select a tag</option>
      {sortedTags?.map(
        tag =>
          tag && (
            <option key={tag.title} value={tag.title}>
              {tag.title}
            </option>
          ),
      )}
    </select>
  );
};

export default Tag;
