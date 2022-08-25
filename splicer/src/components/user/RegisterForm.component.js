import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import jwt from "jwt-decode";

function RegisterForm() {
  const name = useRef();
  const gender = useRef();
  const email_id = useRef();
  const phn_no = useRef();
  const password = useRef();
  const dob = useRef();
  const navigator = useNavigate();

  const initialValues = {
    name: "",
    gender: "M",
    email_id: "",
    phn_no: "",
    password: "",
    profile_pic: "",
    dob: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  // 👛 useeffect rerender on formerror change value
  useEffect(() => {
    console.log("Form Errors = ", formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("Form Values", formValues);
    }
  }, [formErrors]);

  // ✅ On Submit handler
  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validate(formValues);
    if (
      !errors["phn_no"] &&
      !errors["password"] &&
      !errors["name"] &&
      !errors["gender"] &&
      !errors["email_id"] &&
      !errors["dob"]
    ) {
      setIsSubmit(true);
      //error handler
      axios.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          console.dir(error);
          setFormErrors({ dob: `${error.response.data.message}` });
          setIsSubmit(false);
          return error;
        }
      );
      //requesting to login
      axios
        .post(process.env.REACT_APP_REGISTER_URL, formValues)
        .then(({ data, status }) => {
          if (status == 201) {
            localStorage.setItem("token", data["token"]);
            localStorage.setItem("user", JSON.stringify(jwt(data["token"])));
            navigator("/dashboard/home", {
              replace: true,
            });
            setIsSubmit(false);
          } else {
            setIsSubmit(false);
          }
        });
    } else {
      setFormErrors(errors);
    }
  };

  //! VALIDATORS
  // 🔴Final Validator
  const validate = (values) => {
    const errors = {};

    const regex1 = /^[6-9]\d{9}$/gi;
    if (!values.phn_no) {
      errors.phn_no = "Mobile Number is required!";
    } else if (!regex1.test(values.phn_no)) {
      errors.phn_no = "This is not a valid Mobile Number format!";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }

    const regex2 = /^[a-zA-Z]+ [a-zA-Z]+$/;

    if (!values.name) {
      errors.name = "Name is required!";
    } else if (!regex2.test(values.name)) {
      errors.name = "This is not a valid Name format!";
    }

    const regex3 = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!values.email_id) {
      errors.email_id = "Email is required!";
    } else if (!regex3.test(values.email_id)) {
      errors.email_id = "This is not a valid Email format!";
    }

    if (!values.dob) {
      errors.dob = "Date of birth is required!";
    }

    if (!values.gender) {
      errors.gender = "Gender is required!";
    }

    return errors;
  };

  // 🟢small validators
  const phn_Validator = (values) => {
    //setIsSubmit(false);

    const errors = {};
    const regex = /^[6-9]\d{9}$/gi;

    if (!values) {
      errors.phn_no = "Mobile Number is required!";
    } else if (!regex.test(values)) {
      errors.phn_no = "This is not a valid Mobile Number format!";
    }

    setFormErrors(errors);

    return errors;
  };
  const password_Validator = (values) => {
    const errors = {};

    if (!values) {
      errors.password = "Password is required";
    } else if (values.length < 6) {
      errors.password = "Password must be more than 6 characters";
    } else if (values.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }

    setFormErrors(errors);

    return errors;
  };
  const name_Validator = (values) => {
    const errors = {};
    const regex = /^[a-zA-Z]+ [a-zA-Z]+$/;

    if (!values) {
      errors.name = "Name is required!";
    } else if (!regex.test(values)) {
      errors.name = "This is not a valid Name format!";
    }

    setFormErrors(errors);

    return errors;
  };
  const emailValidator = (values) => {
    const errors = {};
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!values) {
      errors.email_id = "Email is required!";
    } else if (!regex.test(values)) {
      errors.email_id = "This is not a Email format!";
    }

    setFormErrors(errors);

    return errors;
  };
  const dobValidator = (values) => {
    const errors = {};
    if (!values) {
      errors.dob = "Date of birth is required!";
    }
    setFormErrors(errors);

    return errors;
  };
  const genderValidator = (values) => {
    const errors = {};
    if (!values) {
      errors.gender = "Gender is required!";
    }
    setFormErrors(errors);

    return errors;
  };

  return isSubmit ? (
    <Loader></Loader>
  ) : (
    <MainFormDiv>
      <Form onSubmit={handleSubmit}>
        <H1>Registration Form</H1>

        <InsideForm>
          {/* 🟢Mobile */}
          <FieldDiv>
            <Label>Mobile Number</Label>
            <TextInput
              ref={phn_no}
              type="text"
              name="phn_no"
              placeholder="Enter registered Mobile Number"
              value={formValues.phn_no}
              onChange={(phn_no) => {
                const val = phn_no.target.value;
                phn_Validator(val);
                setFormValues({ ...formValues, phn_no: val });
              }}
            />
            <ErrorText>{formErrors.phn_no}</ErrorText>
          </FieldDiv>

          {/* 🟢Password */}
          <FieldDiv>
            <Label>Password</Label>
            <TextInput
              ref={password}
              type="password"
              name="password"
              placeholder="Enter your Password"
              value={formValues.password}
              onChange={(password) => {
                const val = password.target.value;
                password_Validator(val);
                setFormValues({ ...formValues, password: val });
              }}
            />
            <ErrorText>{formErrors.password}</ErrorText>
          </FieldDiv>

          {/* 🟢Name */}
          <FieldDiv>
            <Label>Full name</Label>

            <TextInput
              ref={name}
              type="text"
              name="name"
              placeholder="Enter your Name"
              value={formValues.name}
              onChange={(name) => {
                const val = name.target.value;
                name_Validator(val);
                setFormValues({ ...formValues, name: val });
              }}
            />
            <ErrorText>{formErrors.name}</ErrorText>
          </FieldDiv>

          {/*🟢 Gender */}
          <FieldDiv>
            <Label>Gender</Label>
            <Select
              name="gender"
              value={formValues.gender}
              ref={gender}
              onChange={(gender) => {
                const val = gender.target.value;
                genderValidator(val);
                setFormValues({ ...formValues, gender: val });
              }}
            >
              <Option value="M">Male</Option>
              <Option value="F">Female</Option>
              <Option value="NA">No Select</Option>
            </Select>
            <ErrorText>{formErrors.gender}</ErrorText>
          </FieldDiv>

          {/* 🟢Email */}
          <FieldDiv>
            <Label>Email</Label>
            <TextInput
              ref={email_id}
              type="email"
              name="email_id"
              placeholder="Enter your Email Id"
              value={formValues.email_id}
              onChange={(email_id) => {
                const val = email_id.target.value;
                emailValidator(val);
                setFormValues({ ...formValues, email_id: val });
              }}
            />
            <ErrorText>{formErrors.email_id}</ErrorText>
          </FieldDiv>

          {/* 🟢Dob */}
          <FieldDiv>
            <Label>Date of Birth</Label>
            <TextInput
              ref={dob}
              type="date"
              name="dob"
              placeholder="Enter your Date of Birth"
              onChange={(dob) => {
                const val = dob.target.value;
                const arr = val.split("-");
                var string = `${arr[1]}/${arr[2]}/${arr[0]}`;
                dobValidator(val);
                setFormValues({ ...formValues, dob: string });
              }}
            />
            <ErrorText>{formErrors.dob}</ErrorText>
          </FieldDiv>

          <Submit>Submit</Submit>
        </InsideForm>
      </Form>
      <Back
        onClick={() => {
          navigator("/user/login", { replace: true });
        }}
      >
        Login
      </Back>
    </MainFormDiv>
  );
}

const H1 = styled.h1`
  color: #fb490e;
`;

const MainFormDiv = styled.div`
  padding: 20px;

  width: 50%;
  @media (max-width: 950px) {
    width: 70%;
  }
  border-style: solid;
  border-color: rgba(80, 80, 100, 0.2);
  box-shadow: 7px 7px 5px 15px rgba(80, 80, 100, 0.2);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  backdrop-filter: blur(80px);
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

const Option = styled.option`
  background: orange;
`;

const ErrorText = styled.p`
  padding: 2px;
  color: red;
`;

const Submit = styled.button`
  width: 30%;
  background: #fb490e;
  border-radius: 5px;
  padding: 15px;
  padding-left: 30px;
  padding-right: 30px;
  margin: 12px 12px 0px 10px;
  color: #fff;
`;
const Back = styled.button`
  background: #0d283a;
  border: none;
  padding: 5px;
  margin: 12px 12px 0px 10px;
  color: #fff;
  &:hover {
    color: #fb490e;
  }
  cursor: pointer;
`;

const Label = styled.label`
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

export default RegisterForm;
