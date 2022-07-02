import React, { useEffect } from "react";
import styled from "styled-components";
import AOS from "aos";
import "aos/dist/aos.css";

function SubCategoryCard(props) {
  useEffect(() => {
    AOS.init();
  }, []);

  const { children } = props;
  return (
    <Card data-aos="fade-up">
      <ImageDiv></ImageDiv>
      <List>
        <CategoryNameDiv>
          <h4>{children[0].parent_name}</h4>
        </CategoryNameDiv>
        <ListContainer>
          {children.map((element) => {
            return (
              <ListItem key={element.id}>{element.sub_category_name}</ListItem>
            );
          })}
        </ListContainer>
        <MoreDiv>
          <More>More</More>
        </MoreDiv>
      </List>
    </Card>
  );
}

export default SubCategoryCard;

const Card = styled.div`
  display: flex;
  width: 30%;
  height: 200px;
  background: #0b121b;
  border-style: none;
  border-radius: 20px;
  margin: 10px;

  @media (max-width: 1250px) {
    width: 45%;
  }
  @media (max-width: 950px) {
    width: 30%;
  }
  @media (max-width: 760px) {
    width: 27.5%;
  }
`;
const ImageDiv = styled.div`
  flex: 2;
  height: 100%;
  border-style: none;
  border-radius: 20px 0 0 20px;
  background-color: grey;
  border-style: none;
`;

const List = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex: 3;
  height: 100%;
  border-style: none;
`;

const ListItem = styled.p`
  margin-left: 10px;
  fontsize: 16px;
  cursor: pointer;
  text-decoration: underline;
  margin-top: 20px;
  text-overflow: ellipsis;
  color: white;
`;
const More = styled(ListItem)`
  margin-top: 0px;
  margin-bottom: 14px;
`;

const CategoryNameDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 2;
  width: 100%;
  border-radius: 0 20px 0 0;
  margin-bottom: 10px;
`;
const MoreDiv = styled(CategoryNameDiv)`
  justify-content: start;
  display: flex;
  align-item: center;
  flex: 1;
  border-radius: 0 0 20px 0;
  margin-bottom: 0px;
  margin-top: 8px;
`;
const ListContainer = styled.div`
  flex: 3;
  width: 100%;
  overflow-y: hidden;
  word-break: break-all;
`;
