import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactDate from "./ContactDate/ContactDate";

class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0,
  };

  // componentDidMount() {
  //   const ingreds = this.props.location.state.ingredients;
  //   const price = this.props.location.state.price;
  //   this.setState({ ingredients: ingreds, price: price });
  // }
  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }

    this.setState({ ingredients: ingredients, price: price });
  }

  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  };
  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          checkoutCanceled={this.checkoutCanceledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
          ingredients={this.state.ingredients}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={(props) => (
            <ContactDate
              price={this.state.price}
              ingredients={this.state.ingredients}
              // historyPROP={this.props.history}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
