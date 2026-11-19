import { useContext, useEffect, useState } from "react";
import AddButton from "../components/shared/AddButton";
import DeleteIcon from "../components/shared/DeleteIcon";
import EditIcon from "../components/shared/EditIcon";
import { GlobalStore } from "../stores/MainStore";
import { data, useNavigate } from "react-router";
import axios from "axios";
import Skeleton from "../components/Skeleton";
import ErrorMessage from "../feedback/errors/ErrorMessage";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  // Hooks
  const { token, userData, base_url } = useContext(GlobalStore);
  const navigate = useNavigate();

  // States

  const [todo, setTodo] = useState("");
  const [formBtn, setFormBtn] = useState("Create");
  const [idForUpdate, setIdForUpdate] = useState(null);
  // Vars
  const endpoint = "todos";

  // Protected Route
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  // Functions
  // Get Todos

  const {
    data: todos,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await axios.get(`${base_url}/${endpoint}`);
      return res.data.data;
    },
    staleTime: 2000,
  });

  // Create Todo
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTodo = {
      name: todo,
    };

    try {
      if (formBtn.toLowerCase() == "create") {
        await axios.post(`${base_url}/${endpoint}`, {
          data: newTodo,
        });
        toast.success("Task Created Successfully", {
          duration: 3000,
        });
      } else {
        await axios.put(`${base_url}/${endpoint}/${idForUpdate}`, {
          data: newTodo,
        });
        setFormBtn("Create");
        setIdForUpdate(null);
        toast.success("Task Updated Successfully", {
          duration: 3000,
        });
      }

      refetch();
      setTodo("");
    } catch (error) {
      toast.error(error.response.data.error.message, {
        duration: 5000,
      });
    }
  };

  // Delete Todo
  async function deleteTodo(documentId) {
    try {
      await axios.delete(`${base_url}/${endpoint}/${documentId}`);
      toast.success("Task Deleted Successfully");
      refetch();
    } catch (error) {
      toast.error(error.response.data.error.message);
    }
  }

  // Get Todo
  function getTodo(documentId) {
    const todo = todos.find((todo) => todo.documentId == documentId);
    setTodo(todo.name);
    setFormBtn("Update");
    setIdForUpdate(documentId);
  }

  // Loading Skeleton
  function displaySkeleton() {
    return (
      <div>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    );
  }

  return (
    <div className="h-full py-5 flex flex-col gap-5">
      <h1 className="my-5 text-4xl font-bold text-center">
        Welcome {userData?.username}
      </h1>
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          onChange={(e) => {
            setTodo(e.target.value);
          }}
          value={todo}
          className="grow bg-white outline-0 border border-gray-300 rounded-lg px-4"
          type="text"
          placeholder="Write your task.."
        />
        <AddButton>{formBtn}</AddButton>
      </form>

      <div className="tasks flex flex-col gap-4">
        {isLoading ? (
          displaySkeleton()
        ) : error ? (
          <ErrorMessage onRetry={getTodos} />
        ) : (
          todos?.map((todo) => (
            <div
              key={todo.name}
              className="task group/parent bg-white shadow-lg flex items-center justify-between rounded-lg py-2 px-4"
            >
              <h2 className="text-lg font-bold tracking-wide capitalize flex flex-col gap-0.5 overflow-hidden">
                {todo.name}
                <span className="block -translate-x-full group-hover/parent:translate-x-0 duration-300 h-0.5 w-full bg-indigo-500"></span>
              </h2>
              <div className="icons flex items-center gap-2">
                <EditIcon documentId={todo.documentId} handleClick={getTodo} />
                <DeleteIcon
                  documentId={todo.documentId}
                  handleClick={deleteTodo}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
