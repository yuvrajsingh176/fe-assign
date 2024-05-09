import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
interface res {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
}
export const Edit = () => {
  const [data, setData] = useState<res | null>(null);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const id = location.pathname.split("/")[2];

  const navigate = useNavigate();

  const handleClick = async () => {
    const task = { title, description: desc, dueDate: date };
    await axios.patch("https://be-assign-hknc.onrender.com/api/update-task/" + id, {
      task,
    });
    navigate("/");
  };
  const getAlldata = async () => {
    const response = await axios.get(
      "https://be-assign-hknc.onrender.com/api/get-single-task/" + id
    );
    const data = response.data;
    setData(data.alltask);
    setTitle(data.alltask.title);
    setDesc(data.alltask.description);
    setDate(new Date(data.alltask.dueDate).toISOString().split("T")[0]);
  };

  useEffect(() => {
    getAlldata();
  }, []);
  console.log(data);
  return (
    <div className=" mx-auto max-w-md flex justify-center flex-col">
      <div className="flex w-full justify-start mx-auto flex-col">
        <div className="w-full flex-col flex">
          <p className="flex justify-center">Add title</p>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded-lg p-3 m-3 outline-none "
          />
        </div>
        <div className="w-full flex-col flex">
          <p className="flex justify-center">Add description</p>
          <input
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="border rounded-lg p-3 m-3 outline-none "
          />
        </div>
        <div className="w-full flex-col flex">
          <p className="flex justify-center">Add due date</p>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border cursor-pointer rounded-lg p-3 m-3 outline-none "
          />
        </div>

        <button
          onClick={handleClick}
          className="border rounded-lg p-3 m-3 bg-white"
        >
          Edit task
        </button>
      </div>
    </div>
  );
};
export default Edit;
