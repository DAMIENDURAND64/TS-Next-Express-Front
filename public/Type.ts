export type Inputs = {
  firstname: string;
  lastname: string;
  name: string;
  authorId: string;
  collectionId: string;
};

export type Author = {
  firstname: string;
  lastname: string;
};

export type Collection = {
  name: string;
};

export type Book = {
  id: string;
  name: string;
  author: Author;
  collection: Collection;
};

export type User = {
  id: string;
  firstname: string;
  lastname: string;
};

export type Name = {
  name: string;
};
