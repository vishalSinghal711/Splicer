// 🔴 This import Syntax is not known to Browser which is in ECMA6  So, babel does that job for us to convert all ECMA6 syntax to ECMA5 making ut browser understandable

// 🔴 React - healps us to create a ReactComponents which are nothing but js object (having their state and their view)
import React from "react";
// 🔴 ReactDOM - now the react components can not be directly rendered to html page becoz. html needs HTML nodes
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";

//!so react DOM convert the react components to html nodes bundle them using webpack and render it on root of html page
ReactDOM.render(
  //? This means convert this react app into html nodes form and render it in below selected element
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,

  //TODO this element is the element from actual web page in which react dom will render its converted nodes
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
