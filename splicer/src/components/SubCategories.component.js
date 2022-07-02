import React from "react";
import styled from "styled-components";
import SubCategoryCard from "./SubCategoryCard.component";
import { useEffect, useState } from "react";
import axios from "axios";

function SubCategories() {
  var [subCategories, setSubCategories] = useState({});

  useEffect(() => {
    axios.get("http://localhost:2345/subcategories").then(({ data }) => {
      var obj = {};
      data.message.forEach((element) => {
        if (obj[`${element.parent_id}`] != null) {
          obj[`${element.parent_id}`].push(element);
        } else {
          obj[`${element.parent_id}`] = [element];
        }
      });
      setSubCategories(obj);
    });
  }, []);

  return (
    <SubCategoriesBlock>
      {Object.entries(subCategories).map(([parent, children]) => {
        return (
          <SubCategoryCard
            key={parent}
            parent={parent}
            children={children}
          ></SubCategoryCard>
        );
      })}
    </SubCategoriesBlock>
  );
}

export default SubCategories;

const SubCategoriesBlock = styled.div`
  margin-left: 10px;
  z-index: 1;
  width: 75%;
  backdrop-filter: blur(80px);
  overflow-y: hidden;
  overflow-x: hidden;
  color: orange;
  top: 10%;
  position: sticky;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  overflow-x: hidden;
  @media (max-width: 950px) {
    width: 80%;
  }
  @media (max-width: 950px) {
    width: 80%;
  }
`;
