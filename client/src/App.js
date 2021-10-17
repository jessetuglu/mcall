import React, {useEffect, useState} from 'react';
import {Login} from './comps/Login';
import {Home} from "./comps/Home";
import './App.css';
import {AuthService} from "./utils/useTokenStore";

const App = () =>{
  const [isAuth, setIsAuth] = useState(AuthService.isAuth());

  // useEffect(()=>{
  // }, [isAuth]);

  return (
    <div>
      <h1>Therapist App</h1>
      {isAuth ? <Home setIsAuth={setIsAuth}/> : <Login setAuth={setIsAuth}/>  }
    </div>
  )
}

export default App;
