import axios from "axios";
import React from "react";
import { useQueryClient } from "react-query";
import { Book } from "../../public/Type";

interface IProps {
  book: Book;
}

function BookItem({ book }: IProps) {
  const client = useQueryClient();

  const deleteBook = async (id: string) => {
    const response = await axios
      .delete(`http://localhost:5000/api/v1/books/${id}`)
      .then(() => client.invalidateQueries(["books"]));
  };

  return (
    <div className="">
      <li className="border border-black rounded-md bg-slate-200 mb-2 p-2 flex flex-col items-center ">
        <p>{book.name}</p>
        <span>
          {book.author.firstname}-{book.author.lastname}
        </span>
        <span>{book.collection.name}</span>
        <button
          onClick={() => deleteBook(book.id)}
          className="text-white text-xs rounded-full bg-black w-4"
        >
          X
        </button>
      </li>
    </div>
  );
}

export default BookItem;
