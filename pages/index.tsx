import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
};

import axios from "axios";

type Author = {
  firstname: string;
  lastname: string;
};

type Book = {
  id: string;
  name: string;
  author: Author;
};

const MyComponent = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Book[]>([]);
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  const { register, handleSubmit } = useForm<Inputs>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(
          "http://localhost:5000/api/v1/books?author=true"
        );
        setData(response);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, []);
  console.log(data);

  return (
    <div>
      {loading && <div>Loading</div>}
      {!loading && (
        <div className="p-2 flex flex-col gap-y-2">
          <h1 className="flex justify-center border ">BOOKS</h1>
          <div className="border border-black rounded-lg">
            <ul className="flex flex-col">
              {data.map((item) => (
                <ul className="py-1 m-4" key={item.id}>
                  <li className="">
                    {item.name}
                    <br />
                    {item.author.firstname}-{item.author.lastname}
                  </li>
                </ul>
              ))}
            </ul>
          </div>
          <div className="flex justify-end"></div>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 px-2">
        <label>Name of the Book : </label>
        <input
          {...register("name")}
          className="border border-black rounded-lg"
        />
        <input
          type="submit"
          className="rounded border bg-blue-500 hover:bg-blue-800 hover:text-white w-fit px-2"
        />
      </form>
    </div>
  );
};

export default MyComponent;
