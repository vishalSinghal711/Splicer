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
  background: ;
  display: none;
  background: green;
  opacity: 0.85;
  @media (max-width: 1150px) {
    display: flex;
  }
`;