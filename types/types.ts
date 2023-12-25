export type Id = string | number;

export type Column = {
  id: string;
  title: string;
};

export type Task = {
  id: string;
  columnId: string;
  content: string;
};
