import axios from "axios";
import { useQuery } from "react-query";
import { Book } from "../public/Type";
import BookItem from "../src/components/Book";
import CreateBook from "../src/components/CreateBook";
import CreateCollection from "../src/components/CreateCollection";
import CreateUser from "../src/components/CreateUser";

async function getAllbooks() {
  const res = await axios.get(
    "http://localhost:5000/api/v1/books?collection=true&author=true"
  );
  return res.data;
}

const MyComponent = () => {
  const { isLoading, data, error } = useQuery("User", getAllbooks);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <p>Sorry something went wrong</p>;
  }
  //console.log(data);
  return (
    <div>
      <div className="h-20 bg-blue-600 text-2xl text-white font-bold flex items-center justify-center">
        BIBLIOTHEQUE
      </div>
      <div className="flex flex-row m-4 gap-4 items-start ">
        <div className="w-3/5 h-[570px] overflow-auto">
          {data.map((bookItem: Book) => (
            <ul key={bookItem.id}>
              <BookItem book={bookItem} />
            </ul>
          ))}
        </div>
        <div className="flex flex-col gap-5 justify-end w-1/2 ">
          <CreateBook />
          <CreateUser />
          <CreateCollection />
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
