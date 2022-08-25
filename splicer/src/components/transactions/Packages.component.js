import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import PackageCard from "./PackageCard.component";
import { theme } from "../../constants";

const Packages = ({ selectedPackage }) => {
  const [packages, setPackages] = useState(null);
  const [cant, setCant] = useState(false);
  const [reason, setReason] = useState("");
  const [selected, setSelected] = useState("");

  useEffect(() => {
    axios.interceptors.response.use(
      (result) => {
        return result;
      },
      (error) => {
        setCant(true);
        setReason(error.response.data.message);
      }
    );
    axios.get(process.env.REACT_APP_GET_PACKAGES).then(({ data, status }) => {
      if (status == 200) {
        setPackages(data.message);
      } else {
        //will be handled by interceptor
      }
    });
  }, []);

  return (
    <Container>
      {packages ? (
        packages.map((p) => {
          return (
            <PackageCard
              key={p._id}
              id={p._id}
              selected={selected}
              setSelected={(val) => {
                setSelected(val);
                selectedPackage(val);
              }}
              price={p.price}
              name={p.name}
              allowedEnrolls={p.allowed_enrolls}
              validity={p.validity}
              status={p.status}
              pic={p.profile_pic}
            ></PackageCard>
          );
        })
      ) : (
        <h1>OOPS</h1>
      )}

      <h1>{reason} </h1>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default Packages;
