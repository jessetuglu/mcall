import React from 'react';
import Proptypes from 'prop-types';
import {AuthService} from "../utils/useTokenStore";

export const Home = ({setIsAuth}) => {
  const testingLogout = () => {
    AuthService.clearAuth();
    setIsAuth(false);
  };

  return (
    <div>
      <div>THIS IS HOME</div>
      <button onClick={testingLogout}>Logout</button>
    </div>
  );
};

Home.propTypes = {
  setIsAuth: Proptypes.func
}
