import React from "react";

import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
  const transformedIngredients = Object.keys(props.ingredients).map(
    (eachIngredient) => {
      return [...Array(props.ingredients[eachIngredient])].map((_, i) => {
        return (
          <BurgerIngredient key={eachIngredient + i} type={eachIngredient} />
        );
      });
    }
  );

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
