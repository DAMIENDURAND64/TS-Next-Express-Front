import axios from "axios";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Inputs } from "../../public/Type";

function CreateCollection() {
  const urlPost = "http://localhost:5000/api/v1/collections";

  const onSubmit: SubmitHandler<Inputs> = (collection) => {
    axios
      .post(urlPost, {
        name: collection.name,
      })
      .then(() => {
        reset();
      });
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  return (
    <div className="flex flex-col rounded-lg bg-blue-300 w-full items-center py-2 gap-2 h-fit">
      <h1>New Collection</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-1"
      >
        <label>Name of the collection : </label>
        <input
          {...register("name", { required: true })}
          className="rounded-md"
        />
        {errors.firstname && <p>Name is required to add a collection</p>}

        <input
          type="submit"
          className="rounded-md bg-blue-900 text-white px-2  hover:text-blue-900 hover:bg-white"
        />
      </form>
    </div>
  );
}

export default CreateCollection;
