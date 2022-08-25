import React from "react";
import Picker from "./ImagePicker";
import styled from "styled-components";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import { useState, useEffect } from "react";
import { theme } from "../../constants";
import { Button } from "bootstrap";

const ImageCollecter = ({ id, callback }) => {
  function PickerConstructor(fileNum) {
    //picked file object
    this.pickedFile = "";
    this.fileNum = fileNum + id;

    //arrow function that binds this to this curr obj
    this.callback = async (file) => {
      //callback will be called from child once user select the file
      const convertToBase64 = (file, obj) => {
        //higher order function in which obove instance is passed as obj parameter
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function() {
          //reszied the image
          resizeBase64Img(reader.result, 100, 100).then(function(newImg) {
            obj.pickedFile = newImg;

            console.dir(obj);
          });
        };
        reader.onerror = function(error) {
          obj.pickedFile = "";
        };
      };
      convertToBase64(file, this);
    };
  }
  function resizeBase64Img(base64, newWidth, newHeight) {
    return new Promise((resolve, reject) => {
      var canvas = document.createElement("canvas");
      canvas.style.width = newWidth.toString() + "px";
      canvas.style.height = newHeight.toString() + "px";
      let context = canvas.getContext("2d");
      let img = document.createElement("img");
      img.src = base64;
      img.onload = function() {
        context.scale(newWidth / img.width, newHeight / img.height);
        context.drawImage(img, 0, 0);
        resolve(canvas.toDataURL());
      };
    });
  }

  const [pickers, setPickers] = useState([new PickerConstructor(1)]);
  const [uploaded, setUploaded] = useState(false);
  const [formError, setFormError] = useState({});

  return (
    <>
      <Wrap>
        <ImageContainer id={id}>
          {pickers.map((picker) => {
            return <Picker object={picker}></Picker>;
          })}
          <Plus
            style={{
              fontSize: 64,
              color: `${theme.light_orange}`,
            }}
            onClick={() => {
              setUploaded(false);
              setPickers([
                ...pickers,
                new PickerConstructor(pickers.length + 1),
              ]);
            }}
          ></Plus>
        </ImageContainer>
        <Upload
          onClick={() => {
            var arr = [];
            pickers.forEach((picker) => {
              if (picker.pickedFile) {
                arr.push(picker.pickedFile);
              }
            });
            if (arr.length > 0) {
              console.log("arr length", arr.length);
              callback(arr);
              setFormError({});
              setUploaded(true);
            } else {
              console.log("arr length", arr.length);
              setFormError({
                error: "Atleast 1 Image Required!",
              });
            }
          }}
        >
          Upload
        </Upload>
        {uploaded ? <P>Successfully Uploaded!</P> : <></>}
        <ErrorText>{formError.error}</ErrorText>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 220px;
  border: solid;
  border-radius: 8px;
  border-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  overflow-x: scroll;
  height: 165px;
  display: flex;
  align-items: center;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const P = styled.p`
  color: green;
`;

const Plus = styled(AddCircleOutlineRoundedIcon)`
  font-size: 80px;
  color: ${theme.light_orange};
  margin-left: 10px;
`;

const Upload = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border-style: solid;
  border-color: ${theme.orange};
  border-radius: 5px;
  padding: 5px;
  margin: 10px;
  color: ${theme.light_orange};
  cursor: pointer;
  @media (max-width: 950px) {
    display: none;
  }
  :hover {
    background: ${theme.orange};
    color: white;
  }
`;

const ErrorText = styled.p`
  padding: 2px;
  color: ${theme.red_error};
`;
export default ImageCollecter;
