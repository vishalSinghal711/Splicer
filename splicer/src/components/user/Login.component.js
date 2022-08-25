import React from "react";
import styled from "styled-components";
import LoginForm from "./LoginForm.component";
import Loginback from "../../assets/7.jpg";


const LoginComponent = () => {
  return (
    <>
      <LoginBox>
        <LogoBox>
          <Name>
            <div>
              <h1 style={{ color: "#fb490e", fontSize: 50 }}>Spli</h1>
            </div>
            <div>
              <h1 style={{ color: "white", fontSize: 50 }}>cer</h1>
            </div>
            <Green2></Green2>
            <Green></Green>
            <Green2></Green2>
          </Name>
        </LogoBox>
        <FormBox>
          <LoginForm></LoginForm>
          {/* <RegisterForm></RegisterForm> */}
        </FormBox>
      </LoginBox>
    </>
  );
};

const LoginBox = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-image: url(${Loginback});
`;

const FormBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 2;
  height: 100%;
  display: flex;
`;

const LogoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;

  display: flex;
`;

const Name = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;
const Green = styled.div`
  width: 10px;
  height: 50px;
  backdrop-filter: blur(80px);
`;
const Green2 = styled.div`
  width: 30px;
  height: 50px;
  background: green;
`;

export default LoginComponent;
