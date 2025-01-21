import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TextArea from "../components/TextArea/TextArea";
import { Link } from 'react-router-dom';

const Home = ({leaderBoard,setLeaderboard}) => {
  const [difficulty, setDifficulty] = useState("easy");
  const [timeDuration, setTimeDuration] = useState(30);


  let username = localStorage.getItem("username") || "Guest";

  useEffect(()=>{
    const savedLeaderboard =  JSON.parse(localStorage.getItem("leaderboard")) || {
      easy:[],
      medium:[],
      hard:[],
    };
    setLeaderboard(savedLeaderboard);
  },[setLeaderboard])

  useEffect(()=>{
    localStorage.setItem("leaderboard",JSON.stringify(leaderBoard));
  },[leaderBoard]); 

  const handleAccuracySubmit = (accuracy) =>{
    const newUser = {username,accuracy};
    setLeaderboard((prev)=>{
      const updatedLeaderboard ={
        ...prev,
        [difficulty]:[...prev[difficulty],newUser].sort(
          (a,b)=>b.accuracy - a.accuracy  
        ),
      }
      return updatedLeaderboard;
    })
  }
  

  const handleTimeDurationChange = (e) =>{
    const value = e.target.value;
    switch(value){
      case "30 sec":
        setTimeDuration(30);
        break;
      case "1 min":
        setTimeDuration(60);
        break;
      case "5 min":
        setTimeDuration(300);
        break;
      default:
        setTimeDuration(30);
        break;
    }
  }

  return (
    <div className="min-h-screen h-screen">
      <Navbar />

      {/* main upper part */}
      <div className="flex justify-around p-5 w-4/5 m-auto h-auto">
        {/* difficulty option */}
        <div>
          <label htmlFor="difficulty">Select Difficulty: </label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            <option  value="Custom">Custom</option>
          </select>
        </div>

        {/* custome fill option */}
          <Link to="/custompara">
          <div className="font-bold cursor-pointer hover:underline">
            Try Custom Paragraph
          </div>
          </Link>
        {/* time option */}

        <div>
          <label htmlFor="time-duration">Select Time: </label>
          <select
            id="time_duration"
            value={timeDuration === 30 ? "30 sec": timeDuration === 60 ? "1 min" : "5 min"}
            onChange={handleTimeDurationChange}
          >
            <option value="30 sec">30 sec</option>
            <option value="1 min">1 min</option>
            <option value="5 min">5 min</option>
          </select>
        </div>


      </div>

      {/* text area part */}
      <TextArea difficulty={difficulty} timeDuration={timeDuration} onSubmitAccuracy={handleAccuracySubmit}/>
    </div>
  );
};

export default Home;
