import axios from "axios";
import { useEffect, useState } from "react";
import Data from "./Data";
import { useNavigate } from "react-router-dom";

interface res {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
}
export const HomePage = () => {
  const [data, setData] = useState<res[]>([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const getAlldata = async () => {
    const response = await axios.get(
      "https://be-assign-hknc.onrender.com/api/get-task"
    );
    const data = response.data;
    setData(data.alltask);
  };
  const handleDelete = async (id: string) => {
    await axios.delete(
      "https://be-assign-hknc.onrender.com/api/delete-task/" + id
    );
    getAlldata(); // Refresh the data after deleting a task
  };
  const handleEdit = async (value: string) => {
    console.log("edit");
    navigate("/edit/" + value);
  };
  useEffect(() => {
    getAlldata();
  }, []);

  const handleClick = async () => {
    if (title.length > 0 && desc.length > 0 && date) {
      const task = { title, description: desc, dueDate: date };
      await axios.post(
        "https://be-assign-hknc.onrender.com/api/add-task",
        task
      );
      getAlldata(); // Refresh the data after adding a new task
    }
  };
  console.log(data);
  return (
    <div className=" mx-auto max-w-md flex justify-center flex-col">
      <div className="flex w-full justify-start mx-auto flex-col">
        <div className="w-full flex-col flex">
          <p className="flex justify-center">Add title</p>
          <input
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded-lg p-3 m-3 outline-none "
          />
        </div>
        <div className="w-full flex-col flex">
          <p className="flex justify-center">Add description</p>
          <input
            onChange={(e) => setDesc(e.target.value)}
            className="border rounded-lg p-3 m-3 outline-none "
          />
        </div>
        <div className="w-full flex-col flex">
          <p className="flex justify-center">Add due date</p>
          <input
            type="date"
            onChange={(e) => setDate(e.target.value)}
            className="border cursor-pointer rounded-lg p-3 m-3 outline-none "
          />
        </div>

        <button
          onClick={handleClick}
          className={`border rounded-lg p-3 m-3  ${
            title.length > 0 && desc.length > 0 && date
              ? "bg-white"
              : "bg-gray-600"
          }`}
        >
          Add task
        </button>
      </div>
      <div className="flex w-full justify-start mx-auto flex-col">
        {data.map((task, index) => (
          <Data
            task={task}
            key={index}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};
export default HomePage;
