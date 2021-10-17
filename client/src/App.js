import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';

import {Login} from './comps/Login';
import {Home} from "./comps/Home";

const App = () =>{

  const [number, setNumber] = useState(undefined);

  useEffect(()=>{
    console.log("number was changed");
  }, [number]);

  return (
    <div>
      <h1>Therapist App</h1>
      {number === undefined ? <Login setNumber={setNumber}/> : <Home number={number}/> }
    </div>
  )
}

export default App;