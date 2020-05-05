import React, { Component } from "react";

import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner /Spinner";
import ErrorHandler from "../../hoc/ErrorHandler/ErrorHandler";

const INGREDIENTS_PRICES = {
  salad: 0.8,
  baconHalal: 1.2,
  cheese: 1.5,
  meat: 2.4,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 2.5,
    purchasable: true,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get("https://jooburger-936ed.firebaseio.com/ingredients.json")
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  updatePurchasaState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((eaching) => {
        return ingredients[eaching];
      })
      .reduce((start, el) => {
        return start + el;
      }, 0);
    this.setState({
      purchasable: sum === 0,
    });
  };

  addIngredientHandler = (type) => {
    const oldIngredientsCount = this.state.ingredients[type];
    const updateCount = oldIngredientsCount + 1;
    const copyOfIngredients = {
      ...this.state.ingredients,
    };
    copyOfIngredients[type] = updateCount;
    const ingredientPrice = INGREDIENTS_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = ingredientPrice + oldPrice;
    this.setState({
      ingredients: copyOfIngredients,
      totalPrice: newPrice,
    });
    this.updatePurchasaState(copyOfIngredients);
  };
  removeIngredientHandler = (type) => {
    const oldIngredientsCount = this.state.ingredients[type];
    if (oldIngredientsCount === 0) {
      return;
    }
    const updateCount = oldIngredientsCount - 1;
    const copyOfIngredients = {
      ...this.state.ingredients,
    };
    copyOfIngredients[type] = updateCount;
    const ingredientPrice = INGREDIENTS_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - ingredientPrice;
    this.setState({
      ingredients: copyOfIngredients,
      totalPrice: newPrice,
    });
    this.updatePurchasaState(copyOfIngredients);
  };

  zeroIngredientsCheck = () => {
    const disabledInfo = {
      ...this.state.ingredients,
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
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push("price=" + this.state.totalPrice);
    const queryString = queryParams.join("&");

    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
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
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            addIngredientHandler={this.addIngredientHandler}
            removeIngredientHandler={this.removeIngredientHandler}
            disabled={this.zeroIngredientsCheck()}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          price={this.state.totalPrice}
          ingredients={this.state.ingredients}
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

export default ErrorHandler(BurgerBuilder, axios);
