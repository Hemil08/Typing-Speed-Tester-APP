import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogIn = () => {

    const [formData,setFormData] = useState({username:'',password:''});
    const navigate = useNavigate();

    const handleChange = (e) =>{
        const {name,value} = e.target;
        setFormData({...formData,[name]:value});
    }


    const handleSubmit = (e) =>{
        e.preventDefault();

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const userFound = users.find(
            (user) => user.username === formData.username && user.password === formData.password
        );

        if (userFound){
            alert("login Successful!");
            localStorage.setItem('authToken',true);
            localStorage.setItem('username',formData.username)
            navigate('/');
        }
        else{
            alert("Invalid email or password!")
        }
    }

  return (
    <div>
      {/* <!--
  This example requires updating your template:

  ```
  <html class="h-full bg-white">
  <body class="h-full">
  ```
--> */}
      <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            class="mx-auto h-10 w-auto"
            src="https://flowbite.com/docs/images/logo.svg"
            alt="Your Company"
          />
          <h1 class="mt-1 text-center text-2xl/9 font-bold tracking-tight text-blue-900 ">
            Typing Speed Test
          </h1>
          <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Log in to your account
          </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form class="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
            <div>
              <div className="flex items-center justify-between">
                <label
                  for="username"
                  class="block text-sm/6 font-medium text-gray-900"
                >
                  Username
                </label>
              </div>
              <div class="mt-2">
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between">
                <label
                  for="password"
                  class="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div class="mt-2">
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log in
              </button>
            </div>
          </form>

          <p class="mt-10 text-center text-sm/6 text-gray-500">
            Not an Account?
            <a
              href="/signUp"
              class="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              SignUp here !
            </a>
          </p>

          <p className="mt-3 text-center text-sm/6 text-gray-500">
            Enter Without Login:- 
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

export default LogIn;
