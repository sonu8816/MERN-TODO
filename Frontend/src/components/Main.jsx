// import { Input } from 'postcss';
import React, { useEffect } from 'react'
import TodoList from './TodoList';
import Input from './Input.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Main({todoList , setTodoList}) {
  const navigate = useNavigate();

    useEffect(()=>{
        //console.log("hello");   
        const todos = JSON.parse(localStorage.getItem('todos'));
        // const token = JSON.parse(localStorage.getItem('token'));
        //console.log('Data',todos);
        const token = localStorage.getItem('token');
          axios.post('https://mern-todo-three-blond.vercel.app/getTodos', {
            token:token
        })
        .then(response => {
            setTodoList(response.data);
        })
        .catch(error => {
            //console.log(error,"h")
            if(error.status){
              navigate('/login');
            }
            //console.error('Error fetching todos:', error);
        });
      },[])
      
  return (
    <div>
    <div>
    <Input todoList={todoList} setTodoList={setTodoList} />
    <TodoList todoList={todoList} setTodoList={setTodoList} />
   </div>
    </div>
  )
}

export default Main