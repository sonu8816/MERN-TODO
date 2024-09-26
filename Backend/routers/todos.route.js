import express from 'express'
const router = express.Router();
import { addTodo, deleteTask, getTodos ,updateStatus,updateTask} from '../controllers/todos.controller.js';



router.post('/getTodos',getTodos);
router.put('/addTodo',addTodo);
router.post('/updateTask',updateTask);
router.delete('/deleteTask',deleteTask);
router.post('/updateStatus',updateStatus);


export default  router;