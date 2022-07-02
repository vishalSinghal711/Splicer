import React from "react";
import styled from "styled-components";

export function AdvertisingAreaFun(props) {
  return <AdvertisingArea></AdvertisingArea>;
}

const AdvertisingArea = styled.div`
  flex: 1;
  position: sticky;
  top: 8vh;
  bottom: 0;
  height: 100vh;
  background-color: #0b1d2c;
  overflow-y: hidden;
  overflow-x: hidden;
  @media (max-width: 1150px) {
    display: none;
  }
  background: url("https://spinexmusic.com/wp-content/uploads/2021/10/SPINEX-MUSIC.gif");
  background-size: contain;
`;

