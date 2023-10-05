import React from 'react';

import Link from 'next/link';

import { CustomLinkProps } from '@/types';

const CustomLink = ({ title, containerStyles, route }: CustomLinkProps) => {
  return (
    <Link className={`custom-btn ${containerStyles}`} href={route}>
      <span className={`flex-1`}>{title}</span>
    </Link>
  );
};

export default CustomLink;
