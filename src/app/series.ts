export interface Series {
  series: string;
  books: Book[];
  count: number;
}

export interface Book {
  _id: string;
  title: string;
  author: string;
  owner: Owner;
  borrowedTo: string | null;
}

export interface Owner {
  _id: string;
  username: string;
}
