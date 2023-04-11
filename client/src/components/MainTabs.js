
import React from "react";
import HomePage from "./HomePage";
import NavBar from "./NavBar";


const MainTabs = ({ children }) => {
  return (
    <>
      <HomePage />
      <NavBar />
      {children}
     
    </>
  );
};

export default MainTabs;

