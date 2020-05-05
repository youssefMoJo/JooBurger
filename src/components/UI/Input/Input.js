import React from "react";
import classes from "./Input.css";

const input = (props) => {
  let inputElement = null;

  const inputClasss = [classes.InputElement];
  if (props.invalid && props.shouldValiddata && props.touched) {
    inputClasss.push(classes.Invalid);
  }

  switch (props.inputtybe) {
    case "input":
      inputElement = (
        <input
          className={inputClasss.join(" ")}
          {...props.inputConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasss.join(" ")}
          {...props.inputConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasss.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.inputConfig.options.map((option) => {
            return <option key={option.value}>{option.displayValue}</option>;
          })}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasss.join(" ")}
          {...props.inputConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}> {props.label} </label>
      {inputElement}
    </div>
  );
};

export default input;

// name: {
//   inputTybe: "input",
//   inputConfig: {
//     type: "text",
//     placeholder: "Your Name",
//   },
//   value: "",
// },
