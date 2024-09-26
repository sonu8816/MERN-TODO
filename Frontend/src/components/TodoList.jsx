import React, { useState } from 'react'
import ListCard from './ListCard';

function TodoList({todoList , setTodoList}) {

     const [status , setStatus] = useState(false);

    
  return (
    <div>
        <div className='bg-gray-800 h-screen min-w-full'>
            <ul className='w-[1000px] m-auto p-5 text-white'>
               { todoList.map((v,i,arr)=>{
                  return  (
                    <ListCard  
                    key={v.id}
                    todoList={arr}
                    setTodoList={setTodoList}
                    task={v}
                    />
                )
                })}
            </ul>
        </div>
    </div>
  )
}

export default TodoList