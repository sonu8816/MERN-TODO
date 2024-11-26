import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from './Utils';


function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email : '',
        password : '',
      });
      const navigate = useNavigate();
      
      function handleChange(e){
        // console.log(e.target);
        
        let {name , value } = e.target;
        // console.log(name,value);
        const copyLoginInfo = {...loginInfo}
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
        
      }
       //console.log(signupInfo);
      
    
      const loginHandle = async(e)=>{
        e.preventDefault();
        const {email , password }  = loginInfo;
        if(!email || !password){
            return handleError('Please fill all the fields');

        }
        try {
            const url = 'https://mern-todo-three-blond.vercel.app/login';
            const response = await fetch(url,{
                method: 'POST',
                headers:{
                    'Content-Type' : "application/json",
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
           // console.log(result)
            const {success , message , jwtToken,name,error,email }  = result;
            if(success){
                handleSuccess(result.message);
              //  console.log(jwtToken);
                localStorage.setItem('token' , jwtToken);
                localStorage.setItem('name' , name);
                // localStorage.setItem('email' , email);
                // console.log(email);
                setTimeout(()=>{
                navigate('/home');
                },1000)
            }
            if(!success){
                handleError(result.message);
            }
            if(error){
                handleError(error?.details[0].message);
            }
        } catch (error) {
            console.log(error);
            
        }
       // console.log(email,password);
      }
      return (
        <div>
          <div className="h-screen flex justify-center bg-gray-500 items-center text-lg">
            <form
              onSubmit={loginHandle}
              className="flex flex-col  bg-white rounded-lg p-6 gap-6 w-[350px] h-90"
            >
              <h1 className="text-2xl font-bold text-center">Login</h1>
              <div className="flex flex-col gap-2">
                <label htmlFor="email">Email : </label>
                <input
                  className="outline-none"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Your Email..."
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password">Password : </label>
                <input
                  className="outline-none"
                  type="password"
                  id="password"
                  name='password'
                  placeholder="Enter Your Password..."
                  onChange={handleChange}
                />
              </div>
              <button className="bg-blue-500 p-2 text-white rounded-lg">
                Login
              </button>
              <div className="text-sm text-center">
                Create an account?{" "}
                <span>
                  <Link className="text-blue-500" to="/signup">Signup</Link>
                </span>
              </div>
            </form>
            <ToastContainer/>
          </div>
        </div>
      );
}

export default Login