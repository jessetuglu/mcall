import axios from 'axios';

export const AuthService = {
  isAuth: () => {
    let token = localStorage.getItem("token");
    console.log('GETTING THE FUCKINTG TOKEN: ', token);
    if (token != null){
      axios.post("http://localhost:5000/verify_token", {token: token})
        .then((resp)=>{
          if (resp.status === 200){
            console.log('coreect token');
            return true;
          }
        })
        .catch((e)=>{
          return false;
        });
    }
    return false;
  },
  setAuth: (token) => {
    localStorage.setItem("token", token);
  },
  clearAuth: () => {
    localStorage.clear();
  }
};
