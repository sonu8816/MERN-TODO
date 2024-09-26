import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ListCard({ todoList, task, setTodoList }) {
  const navigate = useNavigate();

  const [status, setStatus] = useState(true);
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoTask, setTodoTask] = useState(task.task);

  function del(id) {
    // console.log(index);
    const token = localStorage.getItem("token");
    axios
      .delete("http://localhost:3000/deleteTask", {
        data: { token: token, id: id },
      })
      .then((response) => {
        //  console.log('Response:', response.data);
        let filtered = todoList.filter((value) => {
          return value.id != id;
        });
        // console.log(filtered);
        setTodoList(filtered);
      })
      .catch((error) => {
        if (error.status) {
          navigate("/login");
        }
        console.error("Error deleting todo:", error);
      });
  }

  function edit(id) {
    // console.log(index);
    //  give code using promt box take task with prevalue
    //   console.log(todoList);
    //   todoList[index] = newTask;
    //   console.log(todoList)
    axios.post("http://localhost:3000/updateTask", {
        token: localStorage.getItem("token"),
        id: id,
        todo: todoTask,
      })
      .then((res) => {
        console.log(res.data);
        let updatedTask = todoList.map((v) =>
          v.id == id ? { ...v, task: todoTask } : { ...v }
        );
        // console.log(filtered);
        setTodoList(updatedTask);
      })
      .catch((error) => {
        if (error.status) {
          navigate("/login");
        }
        console.error("Error updating todo:", error);
      });

    // setTodoList(todoList);
  }

  function check(id) {
    console.log(status);
    axios
      .post("http://localhost:3000/updateStatus", {
        token: localStorage.getItem("token"),
        id: id,
      })
      .then((res) => {
        console.log(res.data);
        let updatedTask = todoList.map((v) =>
          v.id == id ? { ...v, status: !v.status } : { ...v }
        );
        setTodoList(updatedTask);
      })
      .catch((error) => {
        if (error.status) {
          navigate("/login");
        }
        console.error("Error updating status:", error);
      });
  }
  return (
    <div>
      <li
        className={`flex justify-between rounded-lg shadow-lg p-4 bg-gray-850${
          task.status ? " bg-green-400 text-black" : ""
        }`}
      >
        {/* <div className={task.status ?"line-through":""}>{task.task}</div>*/}
        <input
          type="text"
          value={todoTask}
          className={`border outline-none w-full bg-transparent rounded-lg ${
            isTodoEditable ? "border-black/10 px-2 py-1 border-white" : "border-transparent"
          } ${task.status  ? "line-through" : ""} `}
          readOnly={!isTodoEditable}
          onChange={(e)=>setTodoTask(e.target.value)}
        />
        <div className="flex gap-3">
        <button
        onClick={() => {
          if (task.status) return;
          if (isTodoEditable) {
            edit(task.id);
            setIsTodoEditable((prev) => !prev);
            // setIsTodoEditable(false);
          } else {
            setIsTodoEditable((prev) => !prev);
          }
        }}
        >
        {isTodoEditable ? "📁" : "✏️"}
        </button>
        <button onClick={() => check(task.id)}>✔</button>
        <button onClick={() => del(task.id)}>❌</button>
        </div>
      </li>
    </div>
  );
}

export default ListCard;
