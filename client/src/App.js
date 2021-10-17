import React, {useState} from 'react';
import {Login} from './comps/Login';
import Home from "./comps/Home";
import './App.css';
import {UserService} from "./utils/UserService";
import Logo from './assets/2.png';

const App = () => {
  const [isAuth, setIsAuth] = useState(UserService.checkAuth());
  return (
    <div>
      <nav className="navbar navbar-expand-lg mt-3">
        <img className={"logo"} src={Logo} alt={"MCall"}/>
      </nav>
      {isAuth ? <Home setIsAuth={setIsAuth}/> : <Login setAuth={setIsAuth}/>}
    </div>
  )
}

export default App;
