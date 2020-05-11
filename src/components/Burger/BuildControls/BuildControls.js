import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.css";

const allControls = [
  { labelName: "Salad", type: "salad" },
  { labelName: "BaconHalal", type: "baconHalal" },
  { labelName: "Cheese", type: "cheese" },
  { labelName: "Meat", type: "meat" },
];
const buildCpntrols = (props) => (
  <div className={classes.BuildControls}>
    <p>
      Current Price: <strong>{props.price.toFixed(2)}</strong>{" "}
    </p>
    {allControls.map((eachControl, i) => (
      <BuildControl
        label={eachControl.labelName}
        key={eachControl + i}
        added={() => props.addIngredientHandler(eachControl.type)}
        removed={() => {
          props.removeIngredientHandler(eachControl.type);
        }}
        disabled={props.disabled[eachControl.type]}
      />
    ))}
    <button
      onClick={props.ordered}
      className={classes.OrderButton}
      disabled={props.purchasable}
    >
      {props.isAuth ? "ORDER NOW" : "SIGN UP TO ORDER"}
    </button>
  </div>
);
export default buildCpntrols;
