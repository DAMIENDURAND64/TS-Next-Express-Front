import React from "react";
import { Book } from "../../public/Type";

interface IProps {
  book: Book;
}

function BookItem({ book }: IProps) {
  return (
    <div className="">
      <li className="border border-black rounded-md bg-slate-200 mb-2 p-2 flex flex-col items-center ">
        <p>{book.name}</p>
        <span>
          {book.author.firstname}-{book.author.lastname}
        </span>
        <span>{book.collection.name}</span>
        <button className="text-white text-xs rounded-full bg-black w-4">
          X
        </button>
      </li>
    </div>
  );
}

export default BookItem;
