import React from "react";
import styled from "styled-components";
import NotFoundImage from "../assets/notfound.png";
import {theme} from '../constants'

const NotFound = () => {
  return (
    <Div>
      <Img src={NotFoundImage} alt="404 Error" />
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: ${theme.light_blue};
`;

const Img = styled.img`
  width: 20%;
`;

export default NotFound;
