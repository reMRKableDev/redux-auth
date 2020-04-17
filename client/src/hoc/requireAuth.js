import React, { Component } from "react";
import { connect } from "react-redux";

export default function requiredAuth(ComposedComponent) {
  class Authentication extends Component {
    componentDidMount() {
      if (!this.props.authenticated) this.props.history.push("/signin");
    }
    componentDidUpdate() {
      if (!this.props.authenticated) this.props.history.push("/signin");
    }
    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = (state) => {
    return { authenticated: state.auth.token };
  };

  return connect(mapStateToProps)(Authentication);
}
