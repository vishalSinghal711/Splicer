import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import jwt from "jwt-decode";

function LoginForm() {
  const phn_no = useRef();
  const password = useRef();

  const initialValues = { phn_no: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const navigator = useNavigate();

  // ⏳renders on form error change
  useEffect(() => {
    console.log("Form Errors = ", formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("Form Values", formValues);
    }
  }, [formErrors]);

  // ✅Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    // setIsSubmit(true);
    if (!errors["phn_no"] && !errors["password"]) {
      setIsSubmit(true);

      //error handler
      axios.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          setFormErrors({ password: `${error.response.data.msg}` });
          setIsSubmit(false);
          return error;
        }
      );
      //requesting to login
      axios
        .post(process.env.REACT_APP_LOGIN_URL, formValues)
        .then(({ data, status }) => {
          if (status == 200) {
            localStorage.setItem("token", data["token"]);
            localStorage.setItem("user", JSON.stringify(jwt(data["token"])));
            navigator("/dashboard/home", { replace: true });
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
    const errors = {};
    const regex = /^[6-9]\d{9}$/gi;

    if (!values.phn_no) {
      errors.phn_no = "Mobile Number is required!";
    } else if (!regex.test(values.phn_no)) {
      errors.phn_no = "This is not a valid Mobile format!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters!";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters!";
    }
    return errors;
  };

  // 🟢 Small Validators
  const phn_Validator = (values) => {
    setIsSubmit(false);

    console.log("PHn no is = ", values);
    const errors = {};
    const regex = /^[6-9]\d{9}$/gi;

    if (!values) {
      errors.phn_no = "Mobile Number is required!";
    } else if (!regex.test(values)) {
      errors.phn_no = "This is not a valid Mobile Number format!";
    }

    setFormErrors(errors);
  };
  const password_Validator = (values) => {
    setIsSubmit(false);

    const errors = {};

    if (!values) {
      errors.password = "Password is required!";
    } else if (values.length < 4) {
      errors.password = "Password must be more than 4 characters!";
    } else if (values.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters!";
    }

    setFormErrors(errors);
  };

  return isSubmit ? (
    isRejected ? (
      <div>Rejected</div>
    ) : (
      <Loader></Loader>
    )
  ) : (
    <MainFormDiv>
      <Form onSubmit={handleSubmit}>
        <H1>Login Form</H1>

        <InsideForm>
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

          <Submit>Submit</Submit>
        </InsideForm>
      </Form>

      <ButtonWrapper>
        <Maybe
          onClick={() => {
            navigator("/dashboard/home", { replace: true });
          }}
        >
          Maybe Later
        </Maybe>
        <Register
          onClick={() => {
            navigator("/user/register", { replace: true });
          }}
        >
          Register
        </Register>
      </ButtonWrapper>
    </MainFormDiv>
  );
}

const H1 = styled.h1`
  color: #fb490e;
`;

const MainFormDiv = styled.div`
  padding: 20px;
  background: rgba(12, 34, 44, 0.47);
  @media (max-width: 950px) {
    width: 70%;
  }
  border-style: solid;
  border-color: rgba(80, 80, 100, 0.2);
  box-shadow: 7px 7px 5px 15px rgba(80, 80, 100, 0.2);
  width: 50%;
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
  width: 30%;
  background: #fb490e;
  border-radius: 5px;
  padding: 15px;
  padding-left: 30px;
  padding-right: 30px;
  margin: 12px 12px 0px 10px;
  color: #fff;
  cursor: pointer;
`;

const Label = styled.label`
  color: #0fbc00;
  margin: 0px 0px 2px 2px;
`;

const Maybe = styled.button`
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
const Register = styled(Maybe)`
  &:hover {
    color: #0fbc00;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
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

export default LoginForm;
