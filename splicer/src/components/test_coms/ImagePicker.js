import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../../constants";

export default function Picker({ object }) {
  const [img, setImg] = useState();

  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImg(URL.createObjectURL(file));
    const callback = object["callback"];
    callback(file);
  };

  return (
    <Wrap>
      <Image src={img} alt="" />
      {/* <Input type="file" onChange={onImageChange} /> */}
      <input
        type="file"
        id={`${object["fileNum"]}`}
        style={{ display: "none" }}
        onChange={onImageChange}
      />
      <Label for={`${object["fileNum"]}`}>Select file</Label>
    </Wrap>
  );
}

const Wrap = styled.div`
  margin-left: 10px;
  width: 120px;
  height: 140px;
  border-radius: 5px;
  border: 2px solid #73ad21;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Label = styled.label`
  margin-top: 2px;
  :hover {
    color: white;
  }
  color: ${theme.orange};
`;

const Image = styled.img`
  max-width: 100px;
  max-height: 100px;
  object-fit: cover;
`;

const Upload = styled.button`
  margin-top: 2px;
  padding: 2px;
`;
