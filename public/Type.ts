export type Inputs = {
  firstname: string;
  lastname: string;
};

export type Author = {
  firstname: string;
  lastname: string;
};

export type Book = {
  id: string;
  name: string;
  author: Author;
};

export type User = {
  id: string;
  firstname: string;
  lastname: string;
};
