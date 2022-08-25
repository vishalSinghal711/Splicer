import React from "react";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import validator from "validator";

const VendorReg = ({ callback }) => {
  const alt_phn_no = useRef();
  const alt_email = useRef();
  const timing = useRef();
  const vendor_about = useRef();

  const initialValues = {
    alt_phn_no: "",
    alt_email: "",
    timing: "",
    vendor_about: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isRejected, setIsRejected] = useState(false);

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
    // setIsSubmit(true);
    if (!errors["phn_no"] && !errors["email"]) {
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
      //requesting to login

      const config = {
        headers: {
          authorization: `BEARER ${localStorage.getItem("token")}`,
        },
      };
      axios
        .post(process.env.REACT_APP_REGISTER_VENDOR_URL, formValues, config)
        .then(({ data, status }) => {
          if (status == 200) {
            console.log("200000");
            console.dir(data);
            let userNew = JSON.parse(localStorage.getItem("user"));
            localStorage.removeItem("user");
            userNew["vendor_id"] = data["message"]["vendor_id"];
            localStorage.setItem("user", JSON.stringify(userNew));
            setIsSubmit(false);
            callback("business");
          } else {
            //will be handled by interceptor
          }
        });
    } else {
      setFormErrors(errors);
    }
  };
  // 🔴 Main validator
  const validate = (values) => {
    console.log("value", values);
    const errors = {};
    const regex = /^[6-9]\d{9}$/gi;

    //either no mob or valid
    if (values.alt_phn_no && !regex.test(values.alt_phn_no)) {
      errors.phn_no = "This is not a valid Mobile format!";
    }
    //either no email or valid
    if (values.alt_email && !validator.isEmail(values.alt_email)) {
      errors.email = "This is not a valid Email!";
    }

    return errors;
  };

  // 🟢 Small Validators
  const phn_Validator = (values) => {
    setIsSubmit(false);

    const errors = {};
    const regex = /^[6-9]\d{9}$/gi;

    if (values && !regex.test(values)) {
      errors.phn_no = "This is not a valid Mobile Number format!";
    }

    setFormErrors(errors);
  };

  return (
    <Container>
      {isSubmit ? (
        <Loader></Loader>
      ) : (
        <Form onSubmit={handleSubmit}>
          <H1>Vendor Details</H1>
          <Sized></Sized>
          <InsideForm>
            {/* Business Mobile Number */}
            <FieldDiv>
              <Label>Business Mobile Number</Label>
              <TextInput
                ref={alt_phn_no}
                type="text"
                name="phn_no"
                placeholder="Enter Business Mobile Number"
                value={formValues.alt_phn_no}
                onChange={(alt_phn_no) => {
                  const val = alt_phn_no.target.value;
                  phn_Validator(val);
                  setFormValues({ ...formValues, alt_phn_no: val });
                }}
              />
              <ErrorText>{formErrors.phn_no}</ErrorText>
            </FieldDiv>

            {/* Business Email */}
            <FieldDiv>
              <Label>Business Email Number</Label>
              <TextInput
                ref={alt_email}
                type="text"
                name="alt_email"
                placeholder="Enter Business Email"
                value={formValues.alt_email}
                onChange={(alt_email) => {
                  const val = alt_email.target.value;
                  if (!validator.isEmail(val)) {
                    formErrors["email"] = `Please Enter the valid Email`;
                  } else {
                    formErrors["email"] = ``;
                  }
                  setFormValues({ ...formValues, alt_email: val });
                }}
              />
              <ErrorText>{formErrors.email}</ErrorText>
            </FieldDiv>
            <FieldDiv>
              <Label>About yourself</Label>
              <TextInput
                ref={vendor_about}
                type="text"
                name="vendor_about"
                placeholder="Write something about yourself.."
                value={formValues.vendor_about}
                onChange={(vendor_about) => {
                  const val = vendor_about.target.value;
                  setFormValues({ ...formValues, vendor_about: val });
                }}
              />
            </FieldDiv>
            <FieldDiv>
              <LabelMandatory>Timings of Business</LabelMandatory>
              <TextInput
                required={true}
                ref={timing}
                type="text"
                name="timing"
                placeholder="Enter timings.."
                value={formValues.timing}
                onChange={(timing) => {
                  const val = timing.target.value;
                  setFormValues({ ...formValues, timing: val });
                }}
              />
            </FieldDiv>
            <ErrorText>{formErrors.response}</ErrorText>
          </InsideForm>
          <Submit>Submit</Submit>
        </Form>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 80%;
  height: 85%;
  animation: mymove3 0.5s;
  margin-top: 7%;
`;

const H1 = styled.h1`
  color: #fb490e;
`;
const Sized = styled.div`
  height: 20px;
`;

const Form = styled.form`
  width: 99%;
  height: 99%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InsideForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 99%;
  height: 99%;
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

const ErrorText = styled.p`
  padding: 2px;
  color: red;
`;

const Submit = styled.button`
  width: 20%;
  background: #fb490e;
  border-radius: 5px;
  padding: 15px;
  margin: 12px 12px 0px 10px;
  color: #fff;
  cursor: pointer;
`;

const Label = styled.label`
  color: #0fbc00;
  margin: 0px 0px 2px 2px;
`;
const LabelMandatory = styled.label`
  :after {
    content: " *";
    color: red;
  }
  color: #0fbc00;
  margin: 0px 0px 2px 2px;
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

export default VendorReg;
