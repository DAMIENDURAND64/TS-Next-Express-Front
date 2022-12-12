import React from "react";
import { Book } from "../../public/Type";

interface IProps {
  book: Book;
}

function BookItem({ book }: IProps) {
  return (
    <div>
      <li>
        {book.name}
        {book.author.firstname}
        {book.author.lastname}
        {book.collection.name}
        <button className="text-red-500">X</button>
      </li>
    </div>
  );
}

export default BookItem;
