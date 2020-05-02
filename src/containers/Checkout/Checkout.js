import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
  state = {
    ingredients: {
      baconHalal: 0,
      cheese: 0,
      meat: 0,
      salad: 0,
    },
  };

  // componentDidMount() {
  //   const ingreds = this.props.location.state.ingredients;
  //   const price = this.props.location.state.price;
  //   this.setState({ ingredients: ingreds, price: price });
  // }
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let param of query.entries()) {
      ingredients[param[0]] = +param[1];
    }

    this.setState({ ingredients: ingredients });
  }

  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  };
  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <CheckoutSummary
        checkoutCanceled={this.checkoutCanceledHandler}
        checkoutContinued={this.checkoutContinuedHandler}
        ingredients={this.state.ingredients}
      />
    );
  }
}

export default Checkout;
