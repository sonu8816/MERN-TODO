import User from "../models/user.model.js";
import AllTodos from '../models/allTodos.model.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signup = async (req ,res)=>{
    try {
         const {fullname , email , password} = req.body;
        // console.log(req.body);
        const userExist =   await User.findOne({email});
        //console.log("hello",userExist,"jhgbv");
        if(userExist){
            return res.status(400).json({message : "User already exist" , status : false});
        }
        const newUser = new User({
            fullname ,
            email,
            password,
        });
        newUser.password = await bcrypt.hash(password , 10)
        newUser.save();
        const newTodo = new AllTodos({email , todo:[]});

        newTodo.save();
        res.status(201).json({message : "User created successfully" , status : true});
    } catch (error) {
        res.status(500).json({message : "Internal server error" , status : false});
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        const errorMsg = "Auth failed: email or password is incorrect";
        if (!user) {
            return res.status(403).json({ message: errorMsg, success: false });
        }

        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403).json({ message: errorMsg, success: false });
        }

        const jwtToken = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.cookie('token', "jwtToken");
        console.log(jwtToken, "Token set in cookie");

        res.status(201).json({
            message: "Login Success",
            success: true,
            jwtToken,
            name: user.fullname
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};