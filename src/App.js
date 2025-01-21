import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";  
import { useState } from 'react';
import Home from './pages/Home';
import LeaderBoard from './pages/LeaderBoard';
import LogIn from './components/Authentication/LogIn';
import SignUp from './components/Authentication/SignUp';
import LoggedInRoute from './components/Authentication/LoggedInRoute';
import Custom from './components/Custom';

function App() {

  const [leaderBoard,setLeaderboard] = useState({
      easy:[],
      medium:[],
      hard:[],
    });

  return (

    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home leaderBoard={leaderBoard} setLeaderboard={setLeaderboard}/>} />
          
          <Route path='/login' element={<LogIn/>}/>
          <Route path='/signUp' element={<SignUp/>}/>

          <Route path='/leaderboard' element={
            <LeaderBoard leaderBoard={leaderBoard} setLeaderboard={setLeaderboard}/>
            }/>

          <Route path='/custompara' element={
            <LoggedInRoute>
            <Custom/>
            </LoggedInRoute>
          }/>
        </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
