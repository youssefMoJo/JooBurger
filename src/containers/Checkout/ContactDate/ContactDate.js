import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactDate.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner /Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/actions/actionTypes";

class ContactDate extends Component {
  state = {
    orderForm: {
      name: {
        inputTybe: "input",
        inputConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        inputTybe: "input",
        inputConfig: {
          type: "text",
          placeholder: "Your St.",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        inputTybe: "input",
        inputConfig: {
          type: "text",
          placeholder: "Your Postal Code",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      country: {
        inputTybe: "input",
        inputConfig: {
          type: "text",
          placeholder: "Your country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        inputTybe: "input",
        inputConfig: {
          type: "email",
          placeholder: "Your E-Mail",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        inputTybe: "select",
        inputConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "",
        // validation: {},
        valid: true,
      },
    },
    formIsValid: false,
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
    };
    axios
      .post("./orders.json", order)
      .then((response) => {
        this.setState({ loading: false });
        // this.props.historyPROP.push("/");
        this.props.history.push("/");
      })
      .catch((error) => this.setState({ loading: false }));
  };

  checkValiditiy(value, rules) {
    let isValid = false;
    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = value.trim() !== "";
    }
    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...this.state.orderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValiditiy(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    let formIsValid = true;
    for (let inputIden in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIden].valid && formIsValid;
    }
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    let formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementArray.map((eachElement) => {
          return (
            <Input
              key={eachElement.id}
              inputtybe={eachElement.config.inputTybe}
              inputConfig={eachElement.config.inputConfig}
              value={eachElement.config.value}
              invalid={!eachElement.config.valid}
              touched={eachElement.config.touched}
              shouldValiddata={eachElement.config.validation}
              changed={(event) =>
                this.inputChangedHandler(event, eachElement.id)
              }
            />
          );
        })}

        <Button
          clicked={this.props.ResetTheState}
          btnType="Success"
          disabled={!this.state.formIsValid}
        >
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactDate}>
        <h1>Enter your Contact Data</h1>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ResetTheState: () => dispatch({ type: actionTypes.RESET_STATE }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactDate);
