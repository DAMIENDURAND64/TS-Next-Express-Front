import React from "react";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { Inputs } from "../../public/Type";
import { useQueryClient } from "react-query";

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

        console.log(res.data);
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  return (
    <div className="flex flex-col rounded-lg bg-blue-300 w-full items-center py-2 gap-2 h-fit">
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
          <p>First name is required to register the Author</p>
        )}
        <label>Last name of the Author : </label>
        <input
          {...register("lastname", { required: true })}
          className="rounded-md"
        />
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

export default CreateUser;
