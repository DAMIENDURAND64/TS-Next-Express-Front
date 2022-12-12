import axios from "axios";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "react-query";
import { Inputs } from "../../public/Type";

const getAllCollection = async () => {
  const res = await axios.get("http://localhost:5000/api/v1/collections");
  return res.data;
};

function CreateBook() {
  const urlPost = "http://localhost:5000/api/v1/books";
  const [users, setUsers] = useState([]);
  const client = useQueryClient();
  const { isLoading, error, data } = useQuery("Collection", getAllCollection);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/users")
      .then((res) => setUsers(res.data));
  }, []);

  const onSubmit: SubmitHandler<Inputs> = (book) => {
    axios
      .post(urlPost, {
        name: book.name,
        authorId: book.authorId,
        collectionId: book.collectionId,
      })
      .then(() => {
        reset();
        client.invalidateQueries(["User"]);
      });
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <p>Sorry something went wrong</p>;
  }
  return (
    <div className="flex flex-col rounded-lg bg-blue-300 w-full items-center py-2 gap-2 h-fit">
      <h1>New Book</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-1"
      >
        <label>Name of the book </label>
        <input
          {...register("name", { required: true })}
          className="rounded-md"
        />
        {errors.firstname && (
          <p>First name is required to register the Author</p>
        )}
        <label>Select Author : </label>
        <select
          {...register("authorId", { required: true })}
          className="rounded-md"
        >
          {users.map((user: any) => (
            <option value={user.id} key={user.id}>
              {user.firstname}-{user.lastname}
            </option>
          ))}
        </select>
        <label>Select Collection : </label>

        <select
          {...register("collectionId", { required: true })}
          className="rounded-md"
        >
          {data.map((collection: any) => (
            <option value={collection.id} key={collection.id}>
              {collection.name}
            </option>
          ))}
        </select>
        {errors.firstname && (
          <p>Last name is required to register the Author</p>
        )}
        <input
          type="submit"
          className="rounded-md bg-blue-900 text-white px-2  hover:text-blue-900 hover:bg-white"
        />
      </form>
    </div>
  );
}

export default CreateBook;
