import React from "react";
import styled from "styled-components";

const arr = [1,2,3,4,4,5,6,6,7,8,4,3,2,2];

function NewCategoriesFun() {
    return <NewCategories>
      {arr.map(()=>{return <CategoriesCard></CategoriesCard>})}
  </NewCategories>;
}

export default NewCategoriesFun;

const NewCategories = styled.div`
  width: 100%;
  height: 80px;
  background: ;
  display: none;
  background: red;
  opacity: 0.85;
  @media (max-width: 950px) {
    display: flex;
  }
  background: rgba(23, 26, 32, 0.8);
  opacity: 0.85;
  overflow-x : scroll;
  overflow-y : hidden;
`;

const CategoriesCard = styled.div`
  width : 100px;
  height : 66px;
  background : red;
  margin : 5px;
`;