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
}

export interface UserProps {
  userName: string;
  id: string;
  avatar: string;
  token: string;
}

export interface ProjectProps {
  id: string;
  title: string;
  stages: StageProps[];
  members: UserProps[];
  dateCreate: Date;
  admin: UserProps;
}

export interface StageProps {
  title: string;
  tickets: TicketProps[];
}

export interface TicketProps {
  title: string;
  description: string;
  comments: CommentProps[];
  assignedUsers: UserProps[];
  tag: TagProps;
  parent?: TicketProps;
  children?: TicketProps[];
  Deadline: TimeRanges;
  creator: UserProps;
}

export interface TagProps {
  title: string;
  level: number;
}

export interface CommentProps {
  commenter: UserProps;
  content: string;
  dateCreated: Date;
  timeCreated: TimeRanges;
}
