import React from "react";
import styled from "styled-components";
import MenuIcon from "@material-ui/icons/Menu";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function Header(props) {
  const navigator = useNavigate();

  return (
    // logo
    <Container>
      <Name>
        <div>
          <h1 style={{ color: "#fb490e" }}>Spli</h1>
        </div>
        <div>
          <h1 style={{ color: "white" }}>cer</h1>
        </div>
        <Green2></Green2>
        <Green></Green>
        <Green2></Green2>
      </Name>

      <NavGroup>
        <Li>
          <NavLink
            style={{ color: "white", textDecoration: "inherit" }}
            to="home"
          >
            Home
          </NavLink>
        </Li>
        <Li>
          <NavLink
            style={{ color: "white", textDecoration: "inherit" }}
            to="favourites"
          >
            Favorites
          </NavLink>
        </Li>

        <Li>
          <NavLink
            style={{ color: "white", textDecoration: "inherit" }}
            to="profile"
          >
            Profile
          </NavLink>
        </Li>

        <Li>
          <NavLink
            style={{ color: "white", textDecoration: "inherit" }}
            to="settings"
          >
            Settings
          </NavLink>
        </Li>
      </NavGroup>

      <ButtonGroup>
        <CustomMenu>
          <CustomMenuIcon></CustomMenuIcon>
        </CustomMenu>

        <LoginBtn>
          <p>Login/Signup</p>
        </LoginBtn>
        <AdvertiseBtn>
          <p>Advertise</p>
        </AdvertiseBtn>
        <ListingBtn
          onClick={() => {
            navigator("/app/favourites");
          }}
        >
          <p>Listing</p>
        </ListingBtn>
      </ButtonGroup>
    </Container>
  );
}

const Container = styled.div`
  z-index: 2;
  height: 64px;
  backdrop-filter: blur(80px);
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  display: flex;
  align-items: center;
`;

const Name = styled.div`
  padding-left: 25px;
  flex-grow: 2;
  height: 100%;
  display: flex;
  align-items: center;
`;
const Green = styled.div`
  width: 5px;
  height: 32px;
  backdrop-filter: blur(80px);
`;
const Green2 = styled.div`
  width: 15px;
  height: 32px;
  background: green;
`;

const ListingBtn = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background: #fb490e;
  border-radius: 5px;
  padding: 20px;
  padding-left: 30px;
  padding-right: 30px;
  margin: 12px;
  color: #fff;
  animation: mymove 0.4s infinite;
  cursor: pointer;
  @media (max-width: 950px) {
    display: none;
  }
`;

const ButtonGroup = styled.div`
  flex-grow: 1;
  flex-direction: row-reverse;
  height: 100%;
  display: flex;
  padding-right: 20px;
`;

const NavGroup = styled.div`
  flex-grow: 2;
  align-items: center;
  justify-content: end;
  height: 100%;
  display: flex;
  padding-right: 20px;
`;
const Li = styled.li`
  list-style: none;
  text-decoration: none;
  padding: 10px 10px 10px 10px;
  border-bottom: solid 2px;
  border-right: solid 1px;
  margin-right: 10px;
  border-radius: 10px;
  text-decoration: none;
  border-color: #f7300f;
  &:hover {
    border-color: white;
  }
`;

const LoginBtn = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border-style: solid;
  border-color: #fb490e;
  border-radius: 30px;
  padding: 20px;
  margin: 10px;
  color: orange;
  cursor: pointer;
  @media (max-width: 950px) {
    display: none;
  }
`;
const AdvertiseBtn = styled(LoginBtn)`
  @media (max-width: 950px) {
    display: none;
  }
`;

const CustomMenu = styled.div`
  align-items: center;
  height: 100%;

  display: none;

  @media (max-width: 950px) {
    display: flex;
  }
`;
const CustomMenuIcon = styled(MenuIcon)`
  color: white;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;
