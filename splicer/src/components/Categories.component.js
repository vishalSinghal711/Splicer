import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Categories() {
  var [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:2345/categories")
      .then(({ data }) => setCategories(data.message));
  }, []);

  return (
    <CategoriesBlock>
      {categories.map((element) => {
        return (
          <CategoryCard key={element.id}>
            <ImageDiv>
              <p>{element.category_image}</p>
            </ImageDiv>
            <NameDiv>{<h4>{element.category_name}</h4>}</NameDiv>
          </CategoryCard>
        );
      })}
    </CategoriesBlock>
  );
}

const CategoriesBlock = styled.div`
  width: 25%;
  margin-left: 10px;
  z-index: 1;
  height: 88vh;
  overflow-y: scroll;
  overflow-x: hidden;
  top: 10%;
  position: sticky;
  padding: 10px;
  background: rgba(23, 26, 32, 0.8);
  opacity: 0.85;
  border-radius: 5px;
  @media (max-width: 950px) {
    display: none;
  }

  @media (max-height: 710px) {
    overflow-y: scroll;
  }
`;

const CategoryCard = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  border-style: solid;
  border-color: white;
  border-radius: 10px;
  margin-top: 20px;
  justify-content: center;
  overflow-x: hidden;
  overflow-y: hidden;
`;

const ImageDiv = styled.div`
  height: 100%;
  width: 50px;
  background-color: white;
  flex: 1;
  overflow-x: hidden;
  color: orange;
`;
const NameDiv = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 50px;
  max-width: 130px;
  flex: 1;
  overflow-x: hidden;
  color: orange;
  padding-left: 20px;
  padding-right: 20px;
`;
