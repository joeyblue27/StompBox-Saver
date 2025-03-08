
import React from "react";
import HomePage from "./HomePage";
/* import NavBar from "./NavBar"; */


const MainTabs = ({ children }) => {
  return (
    <>
      <HomePage />
      
      {children}
     
    </>
  );
};

export default MainTabs;

