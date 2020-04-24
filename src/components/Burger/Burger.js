import React from "react";

import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((eachIngredient) => {
      return [...Array(props.ingredients[eachIngredient])].map((_, i) => {
        return (
          <BurgerIngredient key={eachIngredient + i} type={eachIngredient} />
        );
      });
    })
    .reduce((initialVal, currentVal) => {
      return initialVal.concat(currentVal);
    }, []);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please Start Adding Ingredients</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;

//   const ingredientsLength = transformedIngredients.length;
//   let realIngredientsLength = 0;
//   const ingredientsExistenceChecking = transformedIngredients.map(
//     (eachArray, i) => {
//       let noIngredients = "";
//       if (eachArray.length === 0) {
//         realIngredientsLength += 1;
//       }
//       if (ingredientsLength === realIngredientsLength) {
//         return <p key={eachArray + i}>please enter ingredients</p>;
//       }
//       return noIngredients;
//     }
//   );
