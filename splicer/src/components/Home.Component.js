import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { AdvertisingAreaFun } from "./advertisements/AdvertisingArea.Component";
import NewAdvertiseArea from "./advertisements/NewAdvertiseArea.component";
import Section from "./Section.component";
import NewCategories from "./categories/NewCategories.component";


export function Home(props) {

  return (
    <BelowHeaderContainer>
      {/* Full Width Advertising Area */}
      <AdvertisingAreaFun></AdvertisingAreaFun>

      {/* Middle Block where actual app reside */}
      <MiddleBlock style={{ flex: 6 }}>
        {/* hide at full screen */}
        <NewAdvertiseArea></NewAdvertiseArea>
        <NewCategories></NewCategories>
        {/* main seeing */}
        <Section></Section>
      </MiddleBlock>

      {/* Full Width Advertising Area */}
      <AdvertisingAreaFun></AdvertisingAreaFun>
    </BelowHeaderContainer>
  );
}

const BelowHeaderContainer = styled.div`
  width: 100vw;
  color: white;
  padding-top: 8vh;
  display: flex;
  background-color: #0d283a;
`;

const MiddleBlock = styled.div`
  flex: 6;
`;
