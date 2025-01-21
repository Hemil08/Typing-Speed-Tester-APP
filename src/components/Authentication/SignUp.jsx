import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {

    const [formData,setFormData] = useState({username:'',email:'',password:''});
    const navigate = useNavigate();

    const handleChange = (e) =>{
        const {name,value} = e.target;
        setFormData({...formData,[name]:value}) 
    }

    const handleSubmit = (e) =>{
        e.preventDefault();

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

        if (!passwordRegex.test(formData.password)) {
            alert("Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const emailExist = users.some((user)=>user.email === formData.email);
        if(emailExist){
            alert("This email is already registered");
            return;
        }
        users.push(formData);
        localStorage.setItem('users',JSON.stringify(users));
        alert("Sign Up Successfull!");
        navigate('/login');
    }


  return (
    <div>
      {/* <!--
  This example requires updating your template:

  ```
  <html className="h-full bg-white">
  <body className="h-full">
  ```
--> */}
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://flowbite.com/docs/images/logo.svg"
            alt="Your Company"
          />
          <h1 className="mt-1 text-center text-2xl/9 font-bold tracking-tight text-blue-900 ">
            Typing Speed Test
          </h1>
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign Up to your account
          </h2>
        </div>

        {/* EMAIL ADDRESS */}

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email address
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autocomplete="email"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* USERNAME */}
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="username"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Username
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    onChange={handleChange}
                  />
                </div>
              </div>
            

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                   name="password"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Already have a Acoount?
            <a
              href="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Log In 
            </a>
          </p>

          <p className="mt-3 text-center text-sm/6 text-gray-500">
            Enter Without SignUp:- 
            <a
              href="/"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Skip
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
