import React, { Component } from "react";
import { connect } from "react-redux";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = (e) => {
    e.preventDefault();

    fetch("/login", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(this.state),
    })
      .then((res) => res.json())
      .then((res) => {
        // sending data to store via an action
        this.props.dispatch({
          type: "CREATE_SESSION",
          user: res.secureUser,
          token: res.token,
        });
        
        this.props.history.push("/profile");
      })
      .catch((err) => console.error(err));
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={this.handleChange}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={this.handleChange}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(SignIn);
