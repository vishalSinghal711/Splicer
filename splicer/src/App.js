import React from "react";
import "./App.css";

//Syntax for Importing
//! point to note : every import must be exported from that file
//* {} used to Destructure that element becoz it has been exported in key : value pair
import HomeContainer from "./container/Home.container";
import { Home } from "./components/Home.Component";
import FavouritesComponent from "./components/Favourites.component";
import SettingsComponent from "./components/Settings.component";
import ProfileComponent from "./components/user/Profile.component";
import LoginContainer from "./container/Login.container";
import LoginComponent from "./components/user/Login.component";
import RegisterComponent from "./components/user/Register.component";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./container/NotFound.Page";
import Splash from "./container/Splash.container";
import RegisterVendor from "./components/vendor/Register.vendor.component";
import PaymentParent from "./components/transactions/PaymentParent.component";

function App() {
  //! Nothing but fancy and easy way of writing [React.createElement (pure Js , ECMA5 , known to browser)]
  //* Browser doesnt understands this fancy ECMA6 code
  //? So , react project uses babel for that task which convert all this fancy (JSX , imports , exports of ECMA6) to pureJS(ECMA5)

  //this is JSX element which is nothing but a fancy way of writing React.createElement to make React components easier and faster
  const jsxElement = (
    <BrowserRouter>
      <Routes>
        {/* default path -> navigate to user */}
        <Route path="/" element={<Splash></Splash>}></Route>

        {/* /user routes */}
        <Route path="/user" element={<LoginContainer></LoginContainer>}>
          <Route path={`login`} element={<LoginComponent></LoginComponent>} />
          <Route
            path={`register`}
            element={<RegisterComponent></RegisterComponent>}
          ></Route>
          {/* /user will redirect to login */}
          <Route path="" element={<Navigate to="login" replace />}></Route>
        </Route>

        {/* {Application routes} */}
        {/* Main app route */}
        <Route path="/dashboard" element={<HomeContainer></HomeContainer>}>
          {/* home route to show category and sub category */}
          <Route path="home" element={<Home></Home>} />
          {/* to show favourites */}
          <Route
            path="favourites"
            element={<FavouritesComponent></FavouritesComponent>}
          ></Route>
          {/* to go to settings */}
          <Route
            path="settings"
            element={<SettingsComponent></SettingsComponent>}
          ></Route>
          {/* to go to profile */}
          <Route
            path="profile"
            element={<ProfileComponent></ProfileComponent>}
          ></Route>
          <Route
            path="profile"
            element={<ProfileComponent></ProfileComponent>}
          ></Route>
          {/* default to home */}
          <Route path="" element={<Navigate to="home" replace />}></Route>
        </Route>

        {/* Register vendor */}
        <Route
          path="/vendor/register"
          element={<RegisterVendor></RegisterVendor>}
        />

        {/* Payment vendor */}
        <Route
          path="/vendor/payment"
          element={<PaymentParent></PaymentParent>}
        />

        <Route path="*" element={<NotFound></NotFound>} />
      </Routes>
    </BrowserRouter>
  );

  return jsxElement;
}

export default App;
