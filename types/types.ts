import { TicketProps } from '.';

export type Id = string | number;

export type Column = {
  id: string;
  title: string;
};

export interface Task {
  id: string;
  columnId: string;
  ticket: TicketProps;
}
