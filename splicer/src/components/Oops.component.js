import React from "react";
import styled from "styled-components";
import { theme } from "../constants";
import Key from "../assets/key.png";
import { useNavigate } from "react-router-dom";

const Oops = () => {
  const navigator = useNavigate();
  return (
    <Container>
      <Image src={Key}></Image>
      <H2>User must be login to register as a vendor</H2>
      <Sized></Sized>
      <LoginBtn
        onClick={() => {
          navigator("/user/login", { replace: true });
        }}
      >
        Let's Login
      </LoginBtn>
    </Container>
  );
};
const Container = styled.div`
  background: ${theme["light_blue"]};
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Image = styled.img`
  width: 100px;
`;
const Sized = styled.div`
  height: 20px;
`;
const H2 = styled.h4`
  color: orange;
`;

const LoginBtn = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border-style: solid;
  border-color: ${theme.orange};
  border-radius: 30px;
  padding: 20px;
  margin: 10px;
  color: ${theme.light_orange};
  cursor: pointer;
  @media (max-width: 950px) {
    display: none;
  }
`;
export default Oops;
