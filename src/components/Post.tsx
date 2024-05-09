interface res {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
}

import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Post = () => {
  const [data, setData] = useState<res | null>(null);
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const getAlldata = async () => {
    const response = await axios.get(
      "https://be-assign-hknc.onrender.com/api/get-single-task/" + id
    );
    const data = response.data;
    setData(data.alltask);
  };

  useEffect(() => {
    getAlldata();
  }, []);

  console.log(data);

  return (
    <div className="pt-4 h-dvh">
      <div className="h-auto rounded-lg bg-white shadow-lg cursor-pointer flex flex-col justify-between p-6  mx-10">
        {data && (
          <div>
            <div>
              <p className="font-bold text-pink-800 text-4xl">Title</p>
              <h2 className="text-lg font-bold mb-2">{data.title}</h2>
            </div>
            <div>
              <p className="font-bold text-pink-800 text-4xl">Description</p>
              <p className="text-lg font-bold mb-2">{data.description}</p>
            </div>
            <div>
              <p className="font-bold text-pink-800 text-4xl">Due Date</p>

              <p className="text-lg font-bold mb-2">
                Due date: {new Date(data.dueDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
