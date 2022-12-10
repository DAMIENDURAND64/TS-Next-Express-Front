import axios from "axios";
import { useQuery } from "react-query";
import CreateBook from "./api/CreateBook";

const getAllbooks = async () => {
  const res = await axios.get("http://localhost:5000/api/v1/users");
  return res.data;
};

const MyComponent = () => {
  const { isLoading, data, error } = useQuery("User", getAllbooks);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <p>Sorry something went wrong</p>;
  }

  return (
    <div>
      <div>
        <ul>
          {data.map((user: any) => (
            <li key={user.id}>
              {user.firstname}
              {user.lastname}
              <button className="text-red-500">X</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-center">
        <CreateBook />
      </div>
    </div>
  );
};

export default MyComponent;
