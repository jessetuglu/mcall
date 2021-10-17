import axios from 'axios';

export const AuthService = {
  isAuth: () => {
    let token = localStorage.getItem("token");
    if (token != null){
      return true;
    }
    return false;
  },
  setAuth: (token) => {
    localStorage.setItem("token", token);
  },
  clearAuth: () => {
    localStorage.clear();
  },
  getAuth: () => {
    return localStorage.getItem("token");
  },
};
