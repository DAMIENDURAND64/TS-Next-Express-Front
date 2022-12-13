import axios from "axios";
import React from "react";
import { useQueryClient } from "react-query";
import { Collection } from "../../public/Type";

type IProps = { data: Collection };

function CollectionList({ data }: IProps) {
  const client = useQueryClient();

  const deleteCollection = async (id: string) => {
    const response = await axios
      .delete(`http://localhost:5000/api/v1/collections/${id}`)
      .then(() => client.invalidateQueries(["Collection"]));
  };

  return (
    <div className="flex justify-between w-full items-center p-1">
      <div className="">{data.name}</div>
      <div
        className="rounded-full bg-black text-white text-xs h-fit px-1"
        onClick={() => deleteCollection(data.id)}
      >
        X
      </div>
    </div>
  );
}

export default CollectionList;
