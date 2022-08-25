import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header.component";
import { useLocation } from "react-router-dom";

const HomeContainer = () => {
  return (
    // TODO fragment( <></> ) - as we know a component only returns one object then how to club two JSX in one
    //way - using div wrap them to make single one and return that div
    //way2 - wrap them in <></> - this will not increase heirarchy of div and inside 2 children but directly renders 2 children separately
    <>
      {/* Header(name,login,listingbutton, etc) of the Application */}

      {/* Below header Everying is Here (Avertising area1 , main app , Advertising area2) */}
      <Header></Header>
      <Outlet></Outlet>
    </>
  );
};

export default HomeContainer;
