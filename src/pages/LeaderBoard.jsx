    import React,{useEffect} from "react";
    import Navbar from "../components/Navbar";

    const LeaderBoard = ({leaderBoard,setLeaderboard}) => {
      
      useEffect(()=>{
          const savedLeaderboard =  JSON.parse(localStorage.getItem("leaderboard")) || {
            easy:[],
            medium:[],
            hard:[],
          };
          setLeaderboard(savedLeaderboard);
        },[setLeaderboard])

        

      return (
        <div>
          <Navbar />
        <div className="flex-col mb-15">

            <h1 className="mt-5 text-4xl font-semibold">LeaderBoard</h1>

          {/* Easy difficulty */}
          <div className="flex ">
          <div className="bg-gray-100 shadow-md rounded-md p-4 mx-auto max-w-sm w-[90%] mt-16 h-64 overflow-auto">
            <h2 className="text-xl font-semibold mb-4">Difficulty-Easy</h2>
            <ul>
              

              {leaderBoard.easy.map((entry,index)=>(
                <li className="flex items-center justify-between py-2 border-b border-gray-300" key={index}>
                <div className="flex items-center">
                  <span className="text-lg font-semibold mr-4">{index + 1}</span>
                  <span className="text-gray-800 font-semibold">{entry.username}</span> 
                  
                </div>
                <span className="text-green-500 font-semibold">{entry.accuracy}</span>
              </li>
              ))} 
            </ul>
          </div>

          {/* Medium Difficulty */}
          <div className="bg-gray-100 shadow-md rounded-md p-4 mx-auto max-w-sm w-[90%] mt-16 h-64 overflow-auto">
            <h2 className="text-xl font-semibold mb-4">Difficulty-Medium</h2>
            <ul>
              {leaderBoard.medium.map((entry,index)=>(
                <li className="flex items-center justify-between py-2 border-b border-gray-300">
                <div className="flex items-center">
                  <span className="text-lg font-semibold mr-4">{index+1}</span>
                  <span className="text-gray-800 font-semibold">{entry.username}</span>
                </div>
                <span className="text-green-500 font-semibold">{entry.accuracy}</span>
              </li>
              ))}
            </ul>
          </div>

          {/* Hard Difficuly */}
          <div className="bg-gray-100 shadow-md rounded-md p-4 mx-auto max-w-sm w-[90%] mt-16 h-64 overflow-auto">
            <h2 className="text-xl font-semibold mb-4">Difficulty-Hard</h2>
            <ul>
              {leaderBoard.hard.map((entry,index)=>(
                <li className="flex items-center justify-between py-2 border-b border-gray-300">
                <div className="flex items-center">
                  <span className="text-lg font-semibold mr-4">{index+1}</span>
                  <span className="text-gray-800 font-semibold">{entry.username}</span>
                </div>
                <span className="text-green-500 font-semibold">{entry.accuracy}</span>
              </li>
              ))}
            </ul>
          </div>
          </div>
          </div>
        </div>
      );
    };

    export default LeaderBoard;
