import mongoose from "mongoose";

const allTodosSchema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    todo:{
        type:Array,
        required:true
    }
})

const AllTodos = mongoose.model('AllTodos' , allTodosSchema);

export default AllTodos;