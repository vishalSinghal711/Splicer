import React from "react";

// ! feature of router dom 6
import { Outlet } from "react-router-dom";

const LoginContainer = () => {
  return (
    //! outlet will put the component according to route in this login container or user container -> Eg login, register
    <Outlet></Outlet>
  );
};

export default LoginContainer;
