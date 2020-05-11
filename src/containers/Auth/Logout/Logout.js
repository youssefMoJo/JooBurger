import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";

class Logout extends Component {
  componentDidMount() {
    this.props.onLogout();
    this.props.onChangingPurchased();
  }
  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
    onChangingPurchased: () => dispatch(actions.changingPurchased()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
