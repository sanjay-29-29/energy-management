import React, { createContext } from "react";

const UserContext = createContext({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export default UserContext;