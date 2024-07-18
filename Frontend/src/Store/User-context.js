import React from "react";

const UserContext = React.createContext({
  user: {},
  isAuth: false,
  setAuth(isAuth) {},
  checkAuth() {},
  setUser(user) {}
});

export default UserContext;