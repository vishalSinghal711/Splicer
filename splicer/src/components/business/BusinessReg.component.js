import React from "react";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  theme,
  state as stateList,
  country as countryList,
} from "../../constants";
import ImagePicker from "../test_coms/ImagePicker";
import Picker from "../test_coms/ImagePicker";
import ImageCollecter from "../test_coms/ImageCollecter.component";

const BusinessReg = () => {
  let businessCategories = [
    "Doctor",
    "Designers",
    "Software",
    "B2B",
    "Restaurant",
    "Caters",
  ];

  //! REfs
  const businessName = useRef();
  const businessCategory = useRef();
  //address
  const houseNo = useRef();
  const street = useRef();
  const locality = useRef();
  const pincode = useRef();
  const state = useRef();
  const country = useRef();
  const address_latitude = useRef();
  const address_longitude = useRef();

  const experience = useRef();

  const initialValues = {
    name: "",
    category: `0`,
    address: "",
    address_latitude: "",
    address_longitude: "",
    age: "",
    product_images: null,
    address_images: null,
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const navigator = useNavigate();

  // ⏳renders on form error change or any error populated in obj
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
  }, [formErrors]);

  // ✅Handle submit
  const handleSubmit = async (e) => {
    //this to prevent deafault action on submit the form
    e.preventDefault();

    const errors = validate(formValues);
    if (Object.keys(errors).length == 0) {
      console.log("error length 0");
      var address = {
        houseNo: houseNo.current.value,
        street: street.current.value,
        locality: locality.current.value,
        pincode: pincode.current.value,
        state: state.current.value,
        country: country.current.value,
        address_latitude: address_latitude.current.value,
        address_longitude: address_longitude.current.value,
      };
      formValues["address"] = JSON.stringify(address);

      console.dir(formValues);
      setIsSubmit(true);

      //error handler
      axios.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          console.log("Hello", error.response.data.message);
          console.dir(error);

          setFormErrors({
            response: `${error.response.data.message}`,
          });
          setIsSubmit(false);
          return error;
        }
      );

      const config = {
        headers: {
          authorization: `BEARER ${localStorage.getItem("token")}`,
        },
      };
      axios
        .post(process.env.REACT_APP_REGISTER_BUSINESS_URL, formValues, config)
        .then(({ data, status }) => {
          if (status == 200) {
            setFormErrors({ response: "Successully Added" });
            setIsSubmit(false);
          } else {
            //will be handled by interceptor
          }
        });
    } else {
      console.log("error length not zero");
      setFormErrors(errors);
    }
  };
  // 🔴 Main validator
  const validate = (values) => {
    console.log("validationsssssssss");

    const errors = {};
    if (!values.name) {
      errors["name"] = "Required Field!";
    }
    if (!values.category) {
      errors["category"] = "Required Field!";
    }

    //address
    if (houseNo && !houseNo.current.value) {
      errors["house_no"] = "Required Field";
    }
    if (!street.current.value) {
      errors["street"] = "Required Field";
    }
    if (!locality.current.value) {
      errors["locality"] = "Required Field";
    }
    if (!pincode.current.value) {
      errors["pincode"] = "Required Field";
    }
    if (!state.current.value) {
      errors["state"] = "Required Field";
    }
    if (!country.current.value) {
      errors["country"] = "Required Field";
    }

    if (!values.address_latitude) {
      errors["address_latitude"] = "Required Field!";
    }
    if (!values.address_longitude) {
      errors["address_longitude"] = "Required Field!";
    }
    if (!values.age) {
      errors["age"] = "Required Field!";
    }
    if (!values.product_images) {
      errors["product_images"] = "Required Field!";
    }
    if (!values.address_images) {
      errors["address_images"] = "Required Field!";
    }

    console.log("errors", errors);
    return errors;
  };

  return (
    <Container>
      {isSubmit ? (
        <Loader></Loader>
      ) : (
        <Form onSubmit={handleSubmit}>
          <H1>Business Details</H1>
          <Sized></Sized>
          <InsideForm>
            {/* Business Name */}
            <FieldDiv>
              <LabelMandatory>Business Name</LabelMandatory>
              <TextInput
                ref={businessName}
                type="text"
                placeholder="Enter Business Name"
                onChange={(businessName) => {
                  const val = businessName.target.value;
                  if (val.length <= 0) {
                    setFormErrors({ name: "Business Name Required" });
                  } else {
                    setFormErrors({});
                  }
                  setFormValues({ ...formValues, name: val });
                }}
              />
              <ErrorText>{formErrors.name}</ErrorText>
            </FieldDiv>

            {/* Business Category */}
            <FieldDiv>
              <LabelMandatory>Business Category</LabelMandatory>
              <Select ref={businessCategory}>
                {businessCategories.map((category, index) => {
                  return (
                    <Option value={index}>{category.toUpperCase()}</Option>
                  );
                })}
              </Select>
              <ErrorText>{formErrors.business_catgory}</ErrorText>
            </FieldDiv>

            {/* Business Address */}
            <FieldSet>
              <Legend>Address</Legend>

              {/* House */}
              <FieldDiv>
                <LabelMandatory>House No./Apartment/Flat</LabelMandatory>
                <TextInput
                  ref={houseNo}
                  type="text"
                  placeholder="Enter House No/ Flat No/ Apartment"
                  onChange={(houseNo) => {
                    const val = houseNo.target.value;
                    if (val.length <= 0) {
                      setFormErrors({ house_no: "House Number Required" });
                    } else {
                      setFormErrors({});
                    }
                    setFormValues({ ...formValues, house_no: val });
                  }}
                />
                <ErrorText>{formErrors.house_no}</ErrorText>
              </FieldDiv>

              {/* Street,Locality */}
              <TwoColumnGrid>
                {/* Street */}
                <FieldDiv>
                  <LabelMandatory>Street</LabelMandatory>
                  <TextInput
                    ref={street}
                    type="text"
                    placeholder="Enter Business Name"
                    onChange={(street) => {
                      const val = street.target.value;

                      if (val.length <= 0) {
                        setFormErrors({ street: "Street Required" });
                      }
                      setFormValues({ ...formValues, street: val });
                    }}
                  />
                  <ErrorText>{formErrors.street}</ErrorText>
                </FieldDiv>
                {/* Locality */}
                <FieldDiv>
                  <LabelMandatory>Locality</LabelMandatory>
                  <TextInput
                    ref={locality}
                    type="text"
                    placeholder="Enter Business Name"
                    onChange={(locality) => {
                      const val = locality.target.value;
                      if (val.length <= 0) {
                        setFormErrors({ locality: "Locality Required" });
                      } else {
                        setFormErrors({});
                      }
                      setFormValues({ ...formValues, locality: val });
                    }}
                  />
                  <ErrorText>{formErrors.locality}</ErrorText>
                </FieldDiv>
              </TwoColumnGrid>

              {/* Pincode/State/Country */}
              <TwoColumnGrid>
                {/* Pincode */}
                <FieldDiv>
                  <LabelMandatory>Pincode</LabelMandatory>
                  <TextInput
                    ref={pincode}
                    type="text"
                    placeholder="Enter Pincode"
                    onChange={(pincode) => {
                      const val = pincode.target.value;
                      const bool = val.match(/^[1-9][0-9]{5}$/gm);
                      if (!bool) {
                        setFormErrors({ pincode: "Enter valid Pincode" });
                      } else {
                        setFormErrors({});
                      }
                      setFormValues({ ...formValues, pincode: val });
                    }}
                  />
                  <ErrorText>{formErrors.pincode}</ErrorText>
                </FieldDiv>

                {/* State */}
                <FieldDiv>
                  <LabelMandatory>State</LabelMandatory>
                  <Select ref={state}>
                    {stateList.map((s) => {
                      return <Option value={s}>{s.toUpperCase()}</Option>;
                    })}
                  </Select>
                  <ErrorText>{formErrors.state}</ErrorText>
                </FieldDiv>

                {/* Country */}
                <FieldDiv>
                  <LabelMandatory>Country</LabelMandatory>
                  <Select ref={country}>
                    {countryList.map((c) => {
                      return <Option value={c}>{c.toUpperCase()}</Option>;
                    })}
                  </Select>
                  <ErrorText>{formErrors.country}</ErrorText>
                </FieldDiv>
              </TwoColumnGrid>

              {/* Address Latitude/Longitude */}
              <TwoColumnGrid>
                <FieldDiv>
                  <LabelMandatory>Address Latitude</LabelMandatory>
                  <TextInput
                    ref={address_latitude}
                    type="text"
                    placeholder="Enter Address Latitude"
                    onChange={(address_latitude) => {
                      const val = address_latitude.target.value;
                      // phn_Validator(val);
                      if (val.length <= 0) {
                        setFormErrors({
                          address_latitude: "Address Latitude is Mandatory",
                        });
                      } else {
                        setFormErrors({});
                      }
                      setFormValues({ ...formValues, address_latitude: val });
                    }}
                  />
                  <ErrorText>{formErrors.address_latitude}</ErrorText>
                </FieldDiv>
                <FieldDiv>
                  <LabelMandatory>Address Longitude</LabelMandatory>
                  <TextInput
                    ref={address_longitude}
                    type="text"
                    placeholder="Enter Address Longitude"
                    onChange={(address_longitude) => {
                      const val = address_longitude.target.value;

                      if (val.length <= 0) {
                        setFormErrors({
                          address_longitude: "Address Longitude is Mandatory",
                        });
                      } else {
                        setFormErrors({});
                      }
                      setFormValues({ ...formValues, address_longitude: val });
                    }}
                  />
                  <ErrorText>{formErrors.address_longitude}</ErrorText>
                </FieldDiv>
              </TwoColumnGrid>
            </FieldSet>
            {/* on response after submit response */}
            <ErrorText>{formErrors.address}</ErrorText>

            {/* Experience */}
            <FieldDiv>
              <LabelMandatory>Experience</LabelMandatory>
              <TextInput
                ref={experience}
                type="text"
                placeholder="Enter Vendor Experience"
                onChange={(experience) => {
                  const val = experience.target.value;
                  if (val.length <= 0) {
                    setFormErrors({ age: "Field Required" });
                  }
                  setFormValues({ ...formValues, age: val });
                }}
              />
              <ErrorText>{formErrors.age}</ErrorText>
            </FieldDiv>

            {/* Product Images */}
            <FieldDiv>
              <LabelMandatory>Product Images</LabelMandatory>
              <ImageCollecter
                id="business_images"
                callback={(productImages) => {
                  setFormValues({
                    ...formValues,
                    product_images: productImages,
                  });
                }}
              ></ImageCollecter>
              <ErrorText>{formErrors.product_images}</ErrorText>
            </FieldDiv>

            {/* Address Images */}
            <FieldDiv>
              <LabelMandatory>Address Images</LabelMandatory>
              <ImageCollecter
                id="address_images"
                callback={(businessAddressImages) => {
                  setFormValues({
                    ...formValues,
                    address_images: businessAddressImages,
                  });
                }}
              ></ImageCollecter>
              <ErrorText>{formErrors.address_images}</ErrorText>
            </FieldDiv>

            {/* on response after submit response */}
            <ErrorText>{formErrors.response}</ErrorText>
          </InsideForm>
          <Submit
            onClick={() => {
              console.log("form is");
              console.dir(formValues);
            }}
          >
            Submit
          </Submit>
        </Form>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding-top: 30px;
  padding-bottom: 50px;
  width: 80%;
  animation: mymove3 0.5s;
  justify-content: center;
  align-items: center;
`;

const H1 = styled.h1`
  color: ${theme.orange};
`;
const Sized = styled.div`
  height: 20px;
`;

const Legend = styled.legend`
  margin-left: 10px;
  font-weight: bold;
  color: ${theme.orange};
`;

const FieldSet = styled.fieldset`
  width: 100%;
  color: ${theme.white};
  border-radius: 10px;
  padding: 10px;
`;
const TwoColumnGrid = styled.div`
  width: 100%;
  display: flex;
`;

const Form = styled.form`
  width: 99%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InsideForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 99%;
`;

const FieldDiv = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 0px;
`;

const TextInput = styled.input`
  padding: 10px;
  border-radius: 10px;
  width: 100%;
`;
const Select = styled.select`
  padding: 10px;
  border-radius: 10px;
  width: 100%;
`;
const Option = styled.option``;

const ErrorText = styled.p`
  padding: 2px;
  color: ${theme.red_error};
`;

const Submit = styled.button`
  width: 20%;
  background: ${theme.orange};
  border-radius: 5px;
  padding: 15px;
  margin: 12px 12px 0px 10px;
  color: ${theme.white};
  cursor: pointer;
`;

const Label = styled.label`
  color: ${theme.green};
  margin: 0px 0px 2px 2px;
`;

const LabelMandatory = styled.label`
  color: ${theme.green};
  margin: 0px 0px 2px 2px;
  :after {
    content: " *";
    color: ${theme.red_error};
  }
`;
const Loader = styled.div`
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #fb490e;
  width: 60px;
  height: 60px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default BusinessReg;
