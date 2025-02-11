import React, { useEffect, useState } from "react";
import QuoteService from "../services/QuoteSevices";

const Navbar = () => {
  const [data, setData] = useState([]);

  const isLoggedIn = Boolean(localStorage.getItem("authToken"));
  const username = localStorage.getItem("username");


  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    localStorage.removeItem("accuracy");
    alert("You have been logged out.");
    window.location.reload();
  };

  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Typing Speed Test
            </span>
          </a>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <a
              href="/"
              className="text-sm  text-gray-500 dark:text-white hover:underline"
            >
              Home
            </a>

            <a
              href="/leaderboard"
              className="text-sm  text-gray-500 dark:text-white hover:underline"
            >
              Leaderboard
            </a>

            {isLoggedIn ? (
              <div>
                <span className=" text-sm  text-gray-500 dark:text-white">
                  Welcome,{username}! 
                </span>
                /
                <a
                  href="/login"
                  className="text-sm  text-blue-600 dark:text-blue-500 hover:underline"
                  onClick={handleLogout}
                >
                  LogOut
                </a>
              </div>
            ) : (
              <div>
                <a
                  href="/login"
                  className="text-sm  text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Login
                </a>{" "}
                /
                <a
                  href="/signUp"
                  className="text-sm  text-blue-600 dark:text-blue-500 hover:underline"
                >
                  SignUp
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>
      {/* <nav className="bg-gray-50 dark:bg-gray-700 h-10">
        <div className="max-w-screen-xl px-4 py-3 mx-auto ">
          <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
              <li className="text-gray-900 dark:text-white hover:underline overflow-x-hidden">
                {data ? (
                  <p>
                    <strong>Quote:</strong> {data.quote}
                  </p>
                ) : (
                  <p>Loading quote....</p>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav> */}
    </div>
  );
};

export default Navbar;
