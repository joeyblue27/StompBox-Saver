
import React from "react";
import HomePage from "./HomePage";

const MainTabs = ({ children }) => {
  return (
    <>
      <HomePage />
      
      {children}
     
    </>
  );
};

export default MainTabs;

