import React from "react";
import Popup from "reactjs-popup";
import styled from "styled-components";
import { theme } from "../../constants";
import { useNavigate } from "react-router-dom";

const Pop = ({ businessCount }) => {
  const navigator = useNavigate();
  return (
    <Popup modal defaultOpen={true} nested>
      {(close) => (
        <>
          <Container>
            <Button onClick={close}>&times;</Button>
            <H2>
              Seems you have already registered for <Span>{businessCount}</Span>{" "}
              Businesses..
            </H2>
            <H3>Activate them in just few bucks.</H3>
            <ActivateButton
              onClick={() => {
                navigator("/vendor/payment");
              }}
            >
              Activate
            </ActivateButton>
          </Container>
        </>
      )}
    </Popup>
  );
};

export default Pop;

const Container = styled.div`
  position: relative;
  width: 70vw;
  height: 70vh;
  border-radius: 30px;
  background: ${theme.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: mymove3 0.3s;
`;

const H2 = styled.h2``;
const Span = styled.span`
  color: ${theme.orange};
  font-size: bold;
`;
const H3 = styled.h3`
  margin-top: 5px;
`;

const ActivateButton = styled.div`
  margin-top: 50px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background: #fb490e;
  border-radius: 5px;
  padding: 15px;
  padding-left: 30px;
  padding-right: 30px;
  color: #fff;
  cursor: pointer;
`;

const Button = styled.button`
  position: absolute;
  right: 0;
  cursor: pointer;
  padding-left: 7px;
  padding-right: 7px;
  padding-bottom: 3px;
  right: -10px;
  top: -10px;
  font-size: 24px;
  border-radius: 18px;
  border-color: red;
  background: ${theme.orange};
  color: ${theme.white};
`;
