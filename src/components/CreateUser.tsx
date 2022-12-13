import React from "react";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { Inputs, User } from "../../public/Type";
import { useQuery, useQueryClient } from "react-query";
import UserList from "./UserList";

function CreateUser() {
  const client = useQueryClient();
  const urlPost = "http://localhost:5000/api/v1/users";

  const onSubmit: SubmitHandler<Inputs> = (user) => {
    axios
      .post(urlPost, {
        firstname: user.firstname,
        lastname: user.lastname,
      })
      .then((res) => {
        reset(), client.invalidateQueries(["AllUsers"]);
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const getAllUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/v1/users");
    return res.data;
  };
  const { isLoading, error, data } = useQuery("AllUsers", getAllUsers);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <p>Sorry something went wrong</p>;
  }

  return (
    <div className="rounded-lg bg-blue-300 flex justify-between h-[200px] p-2 ">
      <div className="flex flex-col  w-1/2 items-center py-2 gap-2 h-fit">
        <h1>New User</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-1"
        >
          <label>First name of the Author : </label>
          <input
            {...register("firstname", { required: true })}
            className="rounded-md"
          />
          {errors.firstname && (
            <p className="text-red-600 text-[10px]">
              First name is required to register the Author
            </p>
          )}
          <label>Last name of the Author : </label>
          <input {...register("lastname")} className="rounded-md" />
          <input
            type="submit"
            className="rounded-md bg-blue-900 text-white px-2  hover:text-blue-900 hover:bg-white"
          />
        </form>
      </div>
      <div className="flex flex-col  w-1/2 items-center overflow-auto rounded-lg bg-gray-300 p-2">
        {data.map((user: User) => (
          <div key={user.id} className="w-full">
            <UserList data={user} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreateUser;
