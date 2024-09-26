import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Input from './components/Input'
import TodoList from './components/TodoList'
import {Routes,Navigate ,Route} from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import axios from 'axios'
import Main from './components/Main'
function App() {
  const [todoList, setTodoList] = useState([]);


 

  
  // useEffect(()=>{
  //  // console.log("hii");
    
  //   console.log(todoList);
  // //  if(todoList)
  // if(todoList.length>0)
  //   localStorage.setItem('todos' , JSON.stringify(todoList));
  // },[todoList]);
  

  return (
   <div>
        <Routes>
        <Route path='/' element={<Navigate to={'/login'}/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route
        path="/home"
        element={
          <Main todoList={todoList} setTodoList={setTodoList}  />
        }
      />
        </Routes>
   </div>
  )
}

export default App
