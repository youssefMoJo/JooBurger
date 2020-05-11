import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.css";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner /Spinner";
import { Redirect } from "react-router-dom";

class Auth extends Component {
  state = {
    controls: {
      email: {
        inputTybe: "input",

        inputConfig: {
          type: "email",
          placeholder: "Your E-mail",
        },

        value: "",

        validation: {
          required: true,
          isEmail: true,
        },

        valid: false,
        touched: false,
      },
      password: {
        inputTybe: "input",

        inputConfig: {
          type: "password",
          placeholder: "Enter The Password",
        },

        value: "",

        validation: {
          required: true,
          minLength: 7,
        },

        valid: false,
        touched: false,
      },
    },
    isSignup: true,
  };

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return { isSignup: !prevState.isSignup };
    });
  };

  checkValiditiy(value, rules) {
    let isValid = false;
    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = value.trim() !== "";
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength;
    }
    return isValid;
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValiditiy(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };
    this.setState({ controls: updatedControls });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  render() {
    let formElementArray = [];
    for (let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }
    const form = formElementArray.map((eachElement) => (
      <Input
        key={eachElement.id}
        inputtybe={eachElement.config.inputTybe}
        inputConfig={eachElement.config.inputConfig}
        value={eachElement.config.value}
        invalid={!eachElement.config.valid}
        touched={eachElement.config.touched}
        shouldValiddata={eachElement.config.validation}
        changed={(event) => this.inputChangedHandler(event, eachElement.id)}
      />
    ));

    if (this.props.loading) {
      return <Spinner />;
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    let authRedirect = null;

    if (this.props.isAuthenticated) {
      if (this.props.building) {
        authRedirect = <Redirect to="/checkout" />;
      } else {
        authRedirect = <Redirect to="/" />;
      }
    }

    return (
      <div className={classes.Auth}>
        {errorMessage}
        {authRedirect}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
          SWITCH TO {this.state.isSignup ? "SIGNIN" : "SIGNUP"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    building: state.burgerBuilder.building,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
