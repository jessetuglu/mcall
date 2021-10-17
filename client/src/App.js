import React, {useState} from 'react';
import {Login} from './comps/Login';
import {Home} from "./comps/Home";
import './App.css';
import {UserService} from "./utils/UserService";

const App = () =>{
  const [isAuth, setIsAuth] = useState(UserService.checkAuth());
  return (
    <div>
      <div className="header">
        <h1 className = "headings">Therapist App</h1>
      </div>
      {isAuth ? <Home setIsAuth={setIsAuth}/> : <Login setAuth={setIsAuth}/>  }
    </div>
  )
}

export default App;
