import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";
import firebase from "../../Firebase";
import loginImage from "../../loginImage.png";
import Helmet from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import ImageLoader from "react-loading-image";
import Skeleton from "react-loading-skeleton";

class Login extends Component {
  state = {
    clicked: false //login後の画面処理
  };

  loginwithGoogle = () => {
    this.setState({
      clicked: !this.state.clicked
    });
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  loginwithTwitter = () => {
    this.setState({
      clicked: !this.state.clicked
    });
    const provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  loginwithFacebook = () => {
    this.setState({
      clicked: !this.state.clicked
    });
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  render() {
    const { auth } = this.props;
    if (auth.uid) return <Redirect to="/" />;
    if (this.state.clicked) {
      return <Skeleton className="ml-5 wrapper" height={200} count={3} />;
    } else {
      return (
        <div className="text-center mt-5 mb-3">
          <Helmet>
            <title>ログイン | Devmap</title>
          </Helmet>
          <h3>Let's get started</h3>
          {/* <img style={{ width: "300px" }} src={loginImage} alt="login_imag" /> */}
          <ImageLoader
            src={loginImage}
            style={{ width: "300px", height: "280px" }}
            loading={() => <Skeleton circle={true} height={220} width={300} />}
            error={() => <div>Error</div>}
          />
          <div style={{ margin: "0 auto" }}>
            <button
              onClick={this.loginwithGoogle}
              className="btn btn-danger mr-1"
            >
              <FontAwesomeIcon icon={faGoogle} /> Google
            </button>
            <button
              className="btn btn-primary mr-1"
              onClick={this.loginwithFacebook}
            >
              <FontAwesomeIcon icon={faFacebookF} /> Facebook
            </button>
            <button className="btn twitter-btn" onClick={this.loginwithTwitter}>
              <FontAwesomeIcon icon={faTwitter} /> Twitter
            </button>

            <Link to="/about" className="btn-sticky">
              Devmapとは？
            </Link>
          </div>
        </div>
      );
    }
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
    signIn: creds => dispatch(signIn(creds))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
