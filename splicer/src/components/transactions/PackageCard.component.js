import React from "react";
import styled from "styled-components";
import { theme } from "../../constants";
const PackageCard = ({
  id,
  selected,
  setSelected,
  price,
  name,
  allowedEnrolls,
  validity,
  status,
  pic,
}) => {
  const Card = styled.div`
    padding: 30px;
    width: 90%;
    border-radius: 10px;
    :hover {
      transform: scale(1.01);
      transition: 0.2s;
      box-shadow: 0 4px 8px 0 rgb(255, 100, 0.7),
        0 6px 20px 0 rgb(255, 100, 0, 0.3);
    }
    box-shadow: 0 4px 8px 0 ${selected.name == name ? `rgb(255, 100, 0.7)` : ``},
      0 6px 20px ${selected.name == name ? `rgb(255, 100, 0, 0.3)` : ``};
    margin-top: 30px;
    display: flex;
    border-style: solid;
    border-color: white;
    margin-bottom: 10px;
  `;

  return status ? (
    <Card
      onClick={() => {
        setSelected({ id, price, name, allowedEnrolls, validity, status, pic });
      }}
    >
      <ImageContainer>
        <Image src={pic}></Image>
      </ImageContainer>

      <Details>
        <ContentWrapper>
          <Label>Price : </Label>
          <Content>₹ {price}</Content>
        </ContentWrapper>
        <ContentWrapper>
          <Label>Package Name : </Label>
          <Content>{name}</Content>
        </ContentWrapper>
        <ContentWrapper>
          <Label>Allowed Enrolls : </Label>
          <Content>{allowedEnrolls} Business</Content>
        </ContentWrapper>
        <ContentWrapper>
          <Label>Validity : </Label>
          <Content>{validity} Days</Content>
        </ContentWrapper>
      </Details>
    </Card>
  ) : (
    <></>
  );
};

const ImageContainer = styled.div`
  flex: 2;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  height: 180px;
  width: 180px;
  object-fit: contain;
`;
const Details = styled.div`
  height: 30vh;
  flex: 3;
  padding: 15px;
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
  background: rgb(136, 199, 150, 0.2);
`;

export default PackageCard;
