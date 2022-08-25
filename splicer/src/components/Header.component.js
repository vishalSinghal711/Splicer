import React from "react";
import styled from "styled-components";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ProfileComponent from "./user/Profile.component";
import { theme } from "../constants";

export function Header(props) {
  const navigator = useNavigate();
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [isProfileShown, setProfileShown] = useState(false);

  return (
    // logo
    <Container>
      <Name>
        <div>
          <h1 style={{ color: theme.orange }}>Spli</h1>
        </div>
        <div>
          <h1 style={{ color: theme.white }}>cer</h1>
        </div>
        <Green2></Green2>
        <Green></Green>
        <Green2></Green2>
      </Name>

      <NavGroup>
        <Li>
          <NavLink
            style={{ color: theme.white, textDecoration: "inherit" }}
            to="home"
          >
            Home
          </NavLink>
        </Li>
        <Li>
          <NavLink
            style={{ color: theme.white, textDecoration: "inherit" }}
            to="favourites"
          >
            Favorites
          </NavLink>
        </Li>

        <Li>
          <NavLink
            style={{ color: theme.white, textDecoration: "inherit" }}
            to="profile"
          >
            Profile
          </NavLink>
        </Li>

        <Li>
          <NavLink
            style={{ color: theme.white, textDecoration: "inherit" }}
            to="settings"
          >
            Settings
          </NavLink>
        </Li>
      </NavGroup>

      <ButtonGroup>
        {isProfileShown ? (
          <CustomMenuContent>
            <ProfileComponent
              callback={(val) => {
                setProfileShown(val);
              }}
            ></ProfileComponent>
          </CustomMenuContent>
        ) : (
          <></>
        )}

        <CustomProfile
          onClick={() => {
            setProfileShown(!isProfileShown);
          }}
        >
          <CustomProfileIcon></CustomProfileIcon>
        </CustomProfile>

        <CustomMenu>
          <CustomMenuIcon></CustomMenuIcon>
        </CustomMenu>

        {isLogin ? (
          <LoginBtn
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              setIsLogin(false);
            }}
          >
            Logout
          </LoginBtn>
        ) : (
          <LoginBtn
            onClick={() => {
              navigator("/user", { replace: true });
            }}
          >
            Login/Signup
          </LoginBtn>
        )}
        <AdvertiseBtn>
          <p>Advertise</p>
        </AdvertiseBtn>
        <ListingBtn
          onClick={() => {
            navigator("/vendor/register");
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
  @media (max-width: 950px) {
    justify-content: center;
  }
`;

const Name = styled.div`
  padding-left: 25px;
  flex-grow: 2;
  height: 100%;
  display: flex;
  align-items: center;
  @media (max-width: 950px) {
    justify-content: left;
  }
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
  background: ${theme.orange};
  border-radius: 5px;
  padding: 20px;
  padding-left: 30px;
  padding-right: 30px;
  margin: 12px;
  color: ${theme.white};
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
  @media (max-width: 950px) {
    justify-content: left;
    flex-grow: 0;
  }
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
  border-color: ${theme.orange};
  &:hover {
    border-color: ${theme.white};
  }
`;

const LoginBtn = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border-style: solid;
  border-color: ${theme.orange};
  border-radius: 30px;
  padding: 20px;
  margin: 10px;
  color: ${theme.light_orange};
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
const CustomProfile = styled.div`
  align-items: center;
  height: 100%;
  display: flex;
  justify-content: center;
`;
const CustomMenuIcon = styled(MenuIcon)`
  color: ${theme.white};
  width: 100%;
  height: 100%;
  cursor: pointer;
`;
const CustomProfileIcon = styled(AccountCircle)`
  color: ${theme.white};
  font-size: 100px;
  cursor: pointer;
  color: ${theme.light_orange};
`;
const CustomMenuContent = styled.div`
  border-style: solid;
  border-color: ${theme.green};
  border-radius: 20px;
  position: fixed;
  z-index: 2;
  right: 30vw;
  top: 30vh;
  width: 300px;
  background: ${theme.white};
`;
