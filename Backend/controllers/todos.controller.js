import AllTodos from "../models/allTodos.model.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const getTodos = async (req, res) => {
  const { token } = req.body;
  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded == null) {
      res.json({ jwt: false });
      return;
    }
    
  //  console.log("Decoded JWT:", decoded);

     const _id = decoded._id;
     const user = await User.findById(_id);
     const email = user.email;
    
    // if (decoded.email !== email) {
    //   return res.status(401).json({ error: "Token does not match the email" });
    // }

    // Fetch todos from the database
    const todos = await AllTodos.findOne({ email });

    if (!todos) {
      return res.status(404).json({ error: "Todos not found for this email" });
    }

    res.json(todos.todo);
    return;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.error("JWT Error: Token has expired.");
      return res.status(401).json({ error: "Token has expired" });
    }
    if (error.name === "JsonWebTokenError") {
      console.error("JWT Error: Invalid token.");
      return res.status(401).json({ error: "Invalid token" });
    }
    // Catch any other errors
    console.error("Unexpected Error:", error);
    res.status(500).json({ error: "Something went wrong" });
    return;
  }
};
export const addTodo = async (req, res) => {
  //console.log(req.body);
  try {
    const { token, todo } = req.body;

     

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded == null) {
      res.json({ jwt: false });
      return;
    }
    const _id = decoded._id;
    const user = await User.findById(_id);
    const email = user.email;

    const todos = await AllTodos.findOne({ email });
    if (todos) {
      todos.todo.push(todo);
      await todos.save();
      res.json(todos.todo);
    }
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};


export const updateTask = async (req, res) => {
  const { token, id, todo } = req.body;
  // console.log(req.body, "update");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded == null) {
      res.json({ jwt: false });
      return;
    }
    const _id = decoded._id;
     const user = await User.findById(_id);
     const email = user.email;

    const result = await AllTodos.updateOne(
      { email, "todo.id": id }, // Find the document and the specific todo item
      { $set: { "todo.$.task": todo } } // Update the task field
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({ success: true, message: "Todo updated successfully" });
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(400).json({ error: "Something went wrong" });
  }
};
export const deleteTask = async (req, res) => {
  const { token, id } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded == null) {
      res.json({ jwt: false });
      return;
    }
    const _id = decoded._id;
    const user = await User.findById(_id);
    const email = user.email;

    const result = await AllTodos.updateOne(
      { email }, // Find the document
      { $pull: { todo: { id: id } } } // Remove the
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json({ success: true, message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(400).json({ error: "Something went wrong" });
  }
};

export const updateStatus = async (req, res) => {
  const { token, id } = req.body;
  try {
    // Fetch the document by email

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded == null) {
      res.json({ jwt: false });
      return;
    }
    const _id = decoded._id;
     const user = await User.findById(_id);
     const email = user.email;

    const todos = await AllTodos.findOne({ email });

    if (!todos) {
      return res.status(404).json({ error: "Document not found" });
    }

    // Find the index of the todo item to update
    const index = todos.todo.findIndex(
      (todo) => String(todo.id) === String(id)
    );
    //console.log(index);
    if (index == -1) {
      return res.status(404).json({ error: "Todo not found" });
    }

    // Toggle the status of the selected todo item
    todos.todo[index].status = Boolean(!todos.todo[index].status);

    // Save the updated document back to the database
    todos.markModified(`todo.${index}.status`);

    await todos.save();

    // Return the updated todo list
    return res.json(todos.todo);
  } catch (error) {
    console.error("Error updating todo:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
