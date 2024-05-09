interface res {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
}
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Data = ({
  task,
  handleDelete,
  handleEdit,
}: {
  task: res;
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
}) => {
  const navigate = useNavigate();

  return (
    <div className="border rounded-lg p-3 m-3 bg-white cursor-pointer flex  justify-between">
      <div
        onClick={() => {
          navigate("/post/" + task._id);
        }}
      >
        <h2 className="truncate">
          {task.title.length > 20
            ? `${task.title.slice(0, 40)}...`
            : task.title}
        </h2>
        <p className="truncate">
          {task.description.length > 20
            ? `${task.description.slice(0, 40)}...`
            : task.description}
        </p>
        <p>Due date: {task.dueDate.split("T")[0]}</p>
      </div>
      <div className="flex flex-col justify-between">
        <div onClick={() => handleEdit(task._id)}>
          <FaEdit />
        </div>
        <div onClick={() => handleDelete(task._id)}>
          <MdDelete />
        </div>
      </div>
    </div>
  );
};

export default Data;
