import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import  Dotenv  from 'dotenv';
import cookieParser from "cookie-parser";
Dotenv.config();
const app = express();
app.use(cookieParser());


import userRoute from './routers/user.route.js'
import todosRoute from './routers/todos.route.js'

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',  // Replace with the domain where the request is coming from
    credentials: true              // Allow cookies and credentials to be sent
}));


function check(req, res, next) {
    // Access and log the token from cookies
    const token = req.cookie.token; 
    console.log(token, "token");
    // Proceed to the next middleware or route handler
    next();
}



app.get('/' ,(req , res)=>{
   res.cookie("token","jwt");
   res.send("done");

})



try {
    mongoose.connect(process.env.MongoDBURL).then((res)=>{
        console.log('Connected to mongoDB');
    })
} catch (error) {
    console.log("Error : " , error);
}

app.use('/',userRoute);


app.use('/',todosRoute);



app.listen(3000, (err)=>{
    try {
        console.log("server is running port 3000");
    } catch (error) {
        console.log("Error : " , error);
    }
})