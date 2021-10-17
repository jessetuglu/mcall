export const UserService = {
  checkAuth: () => {
    let user = localStorage.getItem("user");
    return user != null;
  },
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  },
  logoutUser: () => {
    localStorage.clear();
  },
  getUser: () => {
    return JSON.parse(localStorage.getItem("user"));
  },
};
