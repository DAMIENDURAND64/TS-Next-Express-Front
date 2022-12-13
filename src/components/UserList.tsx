import axios from "axios";
import React from "react";
import { useQueryClient } from "react-query";
import { User } from "../../public/Type";

type IProps = { data: User };

function UserList({ data }: IProps) {
  const client = useQueryClient();

  const deleteUser = async (id: string) => {
    await axios
      .delete(`http://localhost:5000/api/v1/users/${id}`)
      .then(() => client.invalidateQueries(["AllUsers"]));
  };
  return (
    <div className="flex justify-between p-1">
      <div>
        {data.firstname}-{data.lastname}
      </div>
      <div>
        <button
          onClick={() => deleteUser(data.id)}
          className="rounded-full bg-black text-xs text-white px-1"
        >
          X
        </button>
      </div>
    </div>
  );
}

export default UserList;
