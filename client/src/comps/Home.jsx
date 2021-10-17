import React from 'react';
import Proptypes from 'prop-types';
import {UserService} from "../utils/UserService";

export const Home = ({setIsAuth}) => {
  const user = UserService.getUser();
  const testingLogout = () => {
    UserService.logoutUser();
    setIsAuth(false);
  };

  return (
    <div>
      <div>Welcome, {user.name}</div>
      <button onClick={testingLogout}>Logout</button>
    </div>
  );
};

Home.propTypes = {
  setIsAuth: Proptypes.func
}
