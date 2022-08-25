import React from 'react'
import styled from "styled-components";

function NewAdvertiseArea() {
  return (
   <NewAdvertise></NewAdvertise>
  )
}

export default NewAdvertiseArea

const NewAdvertise = styled.div`
  width: 100%;
  height: 30vh;
  display: none;
  background: url("https://spinexmusic.com/wp-content/uploads/2021/10/SPINEX-MUSIC.gif");
  opacity: 0.85;
  @media (max-width: 1150px) {
    display: flex;
  }
`;