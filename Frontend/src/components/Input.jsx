import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { handleError, handleSuccess } from "./Utils";
import { ToastContainer } from "react-toastify";

function Input({ todoList, setTodoList }) {
  const [task, setTask] = useState("");
  const [user, setUser] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setUserName(localStorage.getItem("name"));
  });

  const handleSumbit = (event) => {
    event.preventDefault();
    if (task.trim() == "") {
      handleError("Please Enter Task");
      setTimeout(() => {}, 2000);
      return;
    }
    const obj = {
      id: Date.now(),
      task: task,
      status: false,
    };
    console.log(obj);
    axios
      .put("http://localhost:3000/addTodo", {
        token: localStorage.getItem("token"),
        todo: obj,
      })
      .then((res) => {
        console.log("Server response:", res.data);
        // Ensure obj and todoList are valid before updating the state
        if (obj && Array.isArray(todoList)) {
          setTodoList([...todoList, obj]);
        } else {
          console.error("Invalid todo object or todoList state");
        }
        setTask(""); // Clear the task input field
      })
      .catch((error) => {
        console.error("Error adding todo:", error);
      });
  };

  //const navigate = useNavigate();

  const logoutHandle = () => {
    // Remove token and other user-related data from localStorage
    localStorage.removeItem("token");
    // localStorage.removeItem("email");
    // Optionally remove other data if necessary

    // Navigate to the login page
    handleSuccess("Logout Successfully");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="bg-gray-700">
    <div className="relative flex items-center justify-center px-2 pt-8 tracking-widest">
    <h1 className="text-white text-3xl absolute left-1/2 transform -translate-x-1/2 pb-2 font-bold ">
      WELCOME  {userName.toUpperCase()} 💖  
    </h1>
    <button
      className="absolute right-0 p-3 bg-red-500 text-white rounded-lg font-bold font-mono"
      onClick={logoutHandle}
    >
      Logout
    </button>
  </div>
  

      <div className="flex flex-col gap-5 items-center justify-center p-5 w-[1000px] m-auto">
        <h2 className="text-white text-3xl font-bold">TODO APP</h2>
        <form onSubmit={handleSumbit} className="flex w-full gap-3">
          <input
            className="w-full p-3 text-xl"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            type="text"
            placeholder="Task..."
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-
                2 px-4 rounded"
          >
            Add
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Input;
