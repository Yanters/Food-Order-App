import React, { Fragment } from "react";

import classes from "./Header.module.css";
import mealImage from "../../assets/picture.jpg";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Foodies</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img
          src={mealImage}
          alt="People enjoying their meal at the restaurant"
        ></img>
      </div>
    </Fragment>
  );
};

export default Header;
