import { theme } from "../../constants";
import React from "react";
import styled from "styled-components";
import axios from "axios";
import logo from "../../assets/notfound.png";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");

    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

async function displayRazorpay(id) {
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }

  // creating a new order
  var body = {
    package_id: `${id}`,
  };

  let result = null;
  try {
    result = await axios({
      method: "post",
      url: "http://localhost:8080/v1/transaction/subscribe/",
      headers: {
        authorization: `BEARER ${localStorage.getItem("token")}`,
      },
      data: body,
    });
  } catch (err) {
    console.log(err.message);
    result = err;
  }

  if (!result) {
    alert("Server error. Are you online?");
    return;
  }

  // Getting the order details back
  const { amount, order_id, currency, t_id } = result.data.message;

  const options = {
    key: "rzp_test_ASMl2gLSqe1FAy", // Enter the Key ID generated from the Dashboard
    amount: amount.toString(),
    currency: currency,
    name: "Singhal Corp.",
    description: "Test Transaction",
    image: { logo },
    order_id: order_id,
    handler: async function(response) {
      const data = {
        orderCreationId: order_id,
        razorpayPaymentId: response.razorpay_payment_id,
        razorpayOrderId: response.razorpay_order_id,
        razorpaySignature: response.razorpay_signature,
        transaction_id: t_id,
      };
      console.log("data = ", data);

      const config = {
        headers: {
          authorization: `BEARER ${localStorage.getItem("token")}`,
        },
      };
      const result = await axios.post(
        "http://localhost:8080/v1/transaction/update_status",
        data,
        config
      );

      console.dir("result");
      alert(result);
    },
    prefill: {
      name: "Vishal Singhal",
      email: "VishalSinghal@example.com",
      contact: "9999999999",
    },
    notes: {
      address: "Singhal Corporate Office",
    },
    theme: {
      color: `${theme.orange}`,
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}

const Payment = ({ id }) => {
  return (
    <PayButton
      onClick={() => {
        displayRazorpay(id);
      }}
    >
      Pay
    </PayButton>
  );
};

const PayButton = styled.button`
  width: 30%;
  background: ${theme.orange};
  border-radius: 5px;
  padding: 15px;
  padding-left: 30px;
  padding-right: 30px;
  margin: 12px 12px 0px 10px;
  color: ${theme.white};
`;

export default Payment;
