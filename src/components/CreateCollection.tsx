import axios from "axios";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "react-query";
import { Collection, Inputs } from "../../public/Type";
import CollectionList from "./CollectionList";

function CreateCollection() {
  const client = useQueryClient();

  const urlPost = "http://localhost:5000/api/v1/collections";

  const onSubmit: SubmitHandler<Inputs> = (collection) => {
    axios
      .post(urlPost, {
        name: collection.name,
      })
      .then(() => {
        reset(), client.invalidateQueries(["Collection"]);
      });
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const getAllCollection = async () => {
    const res = await axios.get("http://localhost:5000/api/v1/collections");
    return res.data;
  };

  const { isLoading, error, data } = useQuery("Collection", getAllCollection);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <p>Sorry something went wrong</p>;
  }

  return (
    <div className="flex flex-row bg-blue-300 rounded-lg justify-around h-[200px] p-2">
      <div className="flex flex-col  w-1/2 items-center py-2 gap-2">
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
      <div className=" flex flex-col  w-1/2 items-center overflow-auto rounded-lg bg-gray-300 p-2">
        {data.map((collection: Collection) => (
          <div key={collection.id} className="w-full">
            <CollectionList data={collection} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreateCollection;
