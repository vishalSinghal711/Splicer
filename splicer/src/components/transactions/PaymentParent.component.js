import React from "react";
import styled from "styled-components";
import { theme } from "../../constants";
import Payment from "./Payment.component";
import { useState } from "react";
import Packages from "./Packages.component";
import PackageCard from "./PackageCard.component";

const PaymentParent = () => {
  const [selected, setSelected] = useState("");
  const RightContainer = styled.div`
  width: 45%;
  height: 100vh;
  ${selected == "" ? `pointer-events: none;` : ``}
  background: ${theme.light_light_blue};
`;

  return (
    <Wrap>
      <LeftContainer>
        <Packages
          selectedPackage={(selectedPackage) => {
            console.log("selected package", selectedPackage);
            setSelected(selectedPackage);
          }}
        ></Packages>
      </LeftContainer>
      <RightContainer>
        <Container>
          <H1>Proceed</H1>
          <Image src={selected.pic}></Image>
          <Details>
            <ContentWrapper>
              <Label>Price : </Label>
              <Content>₹ {selected.price}</Content>
            </ContentWrapper>
            <ContentWrapper>
              <Label>Package Name : </Label>
              <Content>{selected.name}</Content>
            </ContentWrapper>
            <ContentWrapper>
              <Label>Allowed Enrolls : </Label>
              <Content>{selected.allowedEnrolls} Business</Content>
            </ContentWrapper>
            <ContentWrapper>
              <Label>Validity : </Label>
              <Content>{selected.validity} Days</Content>
            </ContentWrapper>
          </Details>
          <Payment id={selected.id}></Payment>
        </Container>
      </RightContainer>
    </Wrap>
  );
};
const Wrap = styled.div`
  height: 100vh;
  width: 100vw;
  background: ${theme.red_error};
  display: flex;
`;

const LeftContainer = styled.div`
  width: 55%;
  height: 100vh;
  background: ${theme.light_blue};
`;

const Image = styled.img`
  height: 200px;
  width: 200px;
`;
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const H1 = styled.h1`
  margin-top: 30px;
  color: ${theme.orange};
  margin-bottom: 30px;
`;

const Details = styled.div`
  height: 30vh;
  width: 100%;
  padding: 15px;
  margin-top: 20px;
`;

const Label = styled.h3`
  color: ${theme.white};
  font-weight: bolder;
`;
const Content = styled.p`
  color: ${theme.green};
  margin-left: 10px;
  font-weight: bold;
`;
const ContentWrapper = styled.div`
  border-left: 2px solid #64c17f;
  margin-bottom: 10px;
  padding: 10px;
  display: flex;
  align-items: start;
  width: 100%;
  background: rgb(100, 100, 100, 0.3);
`;
export default PaymentParent;
