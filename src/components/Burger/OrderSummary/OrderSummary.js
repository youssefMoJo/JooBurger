import React from "react";
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
  const IngredientSummary = Object.keys(props.ingredients).map((eachKey) => {
    return (
      <li key={eachKey}>
        <span style={{ textTransform: "capitalize  " }}> {eachKey} </span> :
        {props.ingredients[eachKey]}
      </li>
    );
  });
  return (
    <Aux>
      <div>
        <h2>Your Order</h2>
        <p>The Ingredients Of Your BURGER</p>
        <ul>{IngredientSummary}</ul>
        <strong>
          <p>TOTAL PRICE: {props.price.toFixed(2)}</p>
        </strong>
        <p>continue to checkout </p>
        <Button btnType="Danger" clicked={props.purchaseCancelle}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={props.purchaseContinued}>
          CONTINUE
        </Button>
      </div>
    </Aux>
  );
};

export default orderSummary;
