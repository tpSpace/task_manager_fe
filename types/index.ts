import { MouseEventHandler } from 'react';

export interface CustomButtonProps {
  title: string;
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface CustomLinkProps {
  title: string;
  containerStyles?: string;
  route: string;
  click?: () => void;
}

export interface ProjectProps {
  id: string;
  title: string;
  stages: StageProps[];
  members: UserProps[];
  admin: UserProps;
  history: string[];
  tags: TagProps[];
}

export interface UserProps {
  userName: string;
  id: string;
  email?: string;
  avatar?: string;
  token?: string;
  projects?: ProjectProps[];
}

export interface StageProps {
  id: string;
  title?: string;
  tickets?: TicketProps[];
}

export interface TicketProps {
  ticketId: string;
  title: string;
  description: string;
  comments?: CommentProps[];
  assignees?: UserProps[];
  tag?: TagProps;
  parent?: TicketProps;
  children?: TicketProps[];
  deadline?: string;
  creator: UserProps;
}

export interface TagProps {
  id: string;
  title: string;
  priority: number;
  color: string;
}

export interface CommentProps {
  id: string;
  commenter: UserProps;
  content: string;
}
