import React from "react";
import styled from "styled-components";
import { theme } from "../../constants";
import Oops from "../Oops.component";
import { useState, useEffect } from "react";
import VendorReg from "./VendorReg.component";
import BusinessReg from "../business/BusinessReg.component";
import axios from "axios";
import Pop from "../test_coms/Pop.component";

const RegisterVendor = () => {
  const [currForm, setCurrentForm] = useState("vendor");
  const [showPopUp, setShowPopUp] = useState(false);
  const [registeredBusiness, setRegistered] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return;
    }
    const user = JSON.parse(localStorage.getItem("user"));
    const vendor_id = user.vendor_id;
    if (vendor_id == null || vendor_id == -1) {
      setCurrentForm("vendor");
      return;
    }
    setCurrentForm("business");
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return;
    }
    //error handler
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        window.alert(JSON.stringify(error));

        return error;
      }
    );

    const config = {
      headers: {
        authorization: `BEARER ${localStorage.getItem("token")}`,
      },
    };
    axios
      .get(process.env.REACT_APP_GET_BUSINESSES, config)
      .then(({ data, status }) => {
        if (status == 200 && data.message != 0) {
          setTimeout(() => {
            setShowPopUp(true);
            setRegistered(data.message);
            setRegistered(data["message"]);
          }, 2000);
        } else {
          //will be handled by interceptor
        }
      });
  }, []);

  return localStorage.getItem("token") ? (
    <>
      <Container>
        <FormBox>
          {currForm == "vendor" ? (
            <VendorReg
              callback={(newForm) => {
                setCurrentForm(newForm);
              }}
            ></VendorReg>
          ) : currForm == "business" ? (
            <BusinessReg></BusinessReg>
          ) : (
            <></>
          )}
        </FormBox>
        <Sized></Sized>
      </Container>
      {showPopUp ? <Pop businessCount={registeredBusiness}></Pop> : <></>}
    </>
  ) : (
    <Oops></Oops>
  );
};

const Container = styled.div`
  background: ${theme["light_blue"]};
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0px;
  padding: 0px;
`;
const FormBox = styled.div`
  margin-top: 20px;
  background: ${theme["dark_blue"]};
  width: 60vw;
  height: 100%;
  display: flex;
  justify-content: center;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Sized = styled.div`
  height: 20px;
`;

const Submit = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background: #fb490e;
  border-radius: 5px;
  padding: 15px;
  padding-left: 30px;
  padding-right: 30px;
  margin: 12px;
  color: #fff;
  cursor: pointer;
  @media (max-width: 950px) {
    display: none;
  }
`;
export default RegisterVendor;
