import React from "react";
import styled from "styled-components";
import Back from "../assets/2.jpg";
import Logo from "../assets/logo.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode";

const Splash = () => {
  const navigator = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      const token = localStorage.getItem("token");

      const user = localStorage.getItem("user");
      if (user) {
        navigator("/dashboard/home", { replace: true });
      } else {
        if (token) {
          const user = jwt(token);
          localStorage.setItem("user", JSON.stringify(user));
          navigator("/dashboard/home", { replace: true });
        } else {
          navigator("/user", { replace: true });
        }
      }
    }, 3000);
  }, []);

  return (
    <>
      <SplashContainer>
        <LogoC src={Logo}></LogoC>
      </SplashContainer>
    </>
  );
};

const SplashContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${Back});
  width: 100vw;
  height: 100vh;
`;
const LogoC = styled.img`
  transform: scale(0.7);
  animation: mymove2 3s infinite;
`;

export default Splash;
