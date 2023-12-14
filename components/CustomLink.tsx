import Link from 'next/link';

import { CustomLinkProps } from '@/types';

const CustomLink = ({
  title,
  containerStyles,
  route,
  click,
}: CustomLinkProps) => {
  return (
    <Link
      className={`custom-btn ${containerStyles}`}
      href={route}
      onClick={click}
    >
      <span className={`flex-1`}>{title}</span>
    </Link>
  );
};

export default CustomLink;
