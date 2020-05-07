import React, { Component } from "react";

import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner /Spinner";
import ErrorHandler from "../../hoc/ErrorHandler/ErrorHandler";
import * as burgerBuilderActions from "../../store/actions/index";
import { connect } from "react-redux";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false,
  };

  // componentDidMount() {
  //   axios
  //     .get("https://jooburger-936ed.firebaseio.com/ingredients.json")
  //     .then((response) => {
  //       this.setState({ ingredients: response.data });
  //     })
  //     .catch((error) => {
  //       this.setState({ error: true });
  //     });
  // }

  updatePurchasaState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((eaching) => {
        return ingredients[eaching];
      })
      .reduce((start, el) => {
        return start + el;
      }, 0);
    return sum === 0;
  };

  zeroIngredientsCheck = () => {
    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return disabledInfo;
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // const stateData = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    // };
    // this.props.history.push({
    //   pathname: "/checkout",
    //   state: stateData,
    // });

    this.props.history.push("/checkout");
  };

  render() {
    let orderSummary = null;

    let burger = this.state.error ? (
      <h1 style={{ textAlign: "center", color: "red" }}>
        Ingredients Can't be loaded
      </h1>
    ) : (
      <Spinner />
    );
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            addIngredientHandler={this.props.onIngredientAdded}
            removeIngredientHandler={this.props.onIngredientRemoved}
            disabled={this.zeroIngredientsCheck()}
            price={this.props.price}
            purchasable={this.updatePurchasaState(this.props.ings)}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          price={this.props.price}
          ingredients={this.props.ings}
          purchaseCancelle={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
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
    onIngredientAdded: (ingName) =>
      dispatch(burgerBuilderActions.addIngredient(ingName)),

    onIngredientRemoved: (ingName) =>
      dispatch(burgerBuilderActions.removeIngredient(ingName)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorHandler(BurgerBuilder, axios));
