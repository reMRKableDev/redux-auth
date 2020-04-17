import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class Signup extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    redirect: false,
  };

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = (e) => {
    e.preventDefault();

    fetch("/register", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(this.state),
    })
      .then((res) => res.json())
      .then((res) =>
        res.message.includes("Success")
          ? this.setState({ redirect: true })
          : console.log(res.message)
      )
      .catch((err) => console.error(err));
  };

  render() {
    return this.state.redirect ? (
      <Redirect to="/signin" />
    ) : (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={this.handleChange}
        />
        <br />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={this.handleChange}
        />
        <br />
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
        <button type="submit">Register</button>
      </form>
    );
  }
}
