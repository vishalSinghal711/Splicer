import React from "react";
import styled from "styled-components";
import MenuIcon from "@material-ui/icons/Cancel";
import Zoom from "react-reveal/Zoom";

const ProfileComponent = ({ callback }) => {
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  return (
    <>
      <Zoom>
        <CustomMenuIcon
          onClick={() => {
            console.log("qkwlkqwd");
            callback(false);
          }}
        ></CustomMenuIcon>
      </Zoom>
      <Div>
        <h1>Profile</h1>
        <Divider />
        <ProfileImage
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQE1DAlo8Ivo6AfE7UQtR0f351DbJalU-FPg&usqp=CAU"
          alt=""
        />
        <h2>{user ? user.first_name : ""}</h2>
        <h2>{user ? user.last_name : ""}</h2>
        <h2>{user ? new Date(user.dob).toLocaleString("In") : ""}</h2>
      </Div>
    </>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  padding-bottom: 20px;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const Divider = styled.hr`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const CustomMenuIcon = styled(MenuIcon)`
  margin-left: 10px;
  margin-top: 10px;
  position: fixed;
  color: black;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 50%;
  margin-bottom: 10px;
`;

export default ProfileComponent;
