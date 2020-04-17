import React, { Component } from "react";
import { connect } from "react-redux";

class Profile extends Component {
  state = {
    profile: {},
  };

  componentDidMount() {
    fetch("/profile", {
      method: "GET",
      headers: new Headers({ Authorization: "Bearer " + this.props.token }),
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({ profile: res });
      })
      .catch();
  }

  render() {
    return (
      <div>
        <h1>Welcome to your Profile</h1>
        <p>First: {this.state.profile.firstName}</p>
        <p>Last: {this.state.profile.lastName}</p>
        <p>Email: {this.state.profile.email}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(Profile);
