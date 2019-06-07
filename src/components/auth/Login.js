import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";
import firebase from "../../Firebase";
import { loginwithGoogle } from "../../store/actions/authActions";
import loginImage from "../../loginImage.png";
import Helmet from "react-helmet";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.signIn(this.state);
  };

  login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }

  render() {
    const { authError, auth } = this.props;
    if (auth.uid) return <Redirect to="/" />;
    return (
      <div className="container text-center mt-5">
        <Helmet>
          <title>ログイン | Devmap</title>
        </Helmet>
        <h3>Let's get started</h3>
        <img style={{ width: "300px" }} src={loginImage} alt="login_imag" />
        <button
          style={{ display: "block", margin: "0 auto" }}
          onClick={this.props.loginwithGoogle}
          className="btn btn-danger"
        >
          Googleログイン
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  };
};

// Call ActionCreater
const mapDispatchToProps = dispatch => {
  return {
    signIn: creds => dispatch(signIn(creds)),
    loginwithGoogle: () => dispatch(loginwithGoogle())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
