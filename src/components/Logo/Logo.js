import React from "react";
import burgerLogo from "../../assets/images/burgerLogo.jpg";
import classes from "./Logo.css";

const logo = (props) => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt="logo" />
  </div>
);

export default logo;
