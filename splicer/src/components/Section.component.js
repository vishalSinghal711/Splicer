import React from "react";
import styled from "styled-components";
import Categories from "./categories/Categories.component";
import SubCategories from "./subcategories/SubCategories.component";

function Section() {
  return (
    <SectionDiv>
      <Categories></Categories>
      {/* <Subcategories></Subcategories> */}
      <SubCategories></SubCategories>
    </SectionDiv>
  );
}

export default Section;

const SectionDiv = styled.div`
  box-sizing: border-box;
  flex: 6;
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
`;
