import React from "react";
import styled from "styled-components";
import axios from "axios";
import logo from "../assets/notfound.png";

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

async function displayRazorpay() {
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }

  // creating a new order
  var body = {
    package_id: "3",
  };

  let result = null;
  try {
    result = await axios({
      method: "post",
      url: "http://localhost:8080/v1/transaction/subscribe/2",
      data: body,
    });
    console.log("result = ", result);
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
  console.log({ amount, order_id, currency });

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

      const result = await axios.post(
        "http://localhost:8080/v1/transaction/update_status/2",
        data
      );

      console.log(result);

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
      color: "#fb490e",
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}

const FavouritesComponent = () => {
  return (
    <Div>
      <PayButton
        onClick={() => {
          displayRazorpay();
        }}
      >
        Pay
      </PayButton>
    </Div>
  );
};

const Div = styled.div`
  padding-top: 80px;
  background: yellow;
  width: 100vw;
  height: 100vh;
`;
const H1 = styled.div`
  color: black;
`;
const PayButton = styled.button`
  width: 30%;
  background: #fb490e;
  border-radius: 5px;
  padding: 15px;
  padding-left: 30px;
  padding-right: 30px;
  margin: 12px 12px 0px 10px;
  color: #fff;
`;

export default FavouritesComponent;
