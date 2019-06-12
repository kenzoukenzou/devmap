import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../store/actions/authActions";
import Twemoji from "react-twemoji";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import uuid from "uuid";
import { withRouter } from "react-router";
import { Dropdown } from "react-bootstrap";

class CustomToggle extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.onClick(e);
  }

  render() {
    return (
      <a href="" onClick={this.handleClick}>
        {this.props.children}
      </a>
    );
  }
}

class Navbar extends Component {
  handleToCreatePage = () => {
    this.props.history.push(`/create/${uuid.v4()}`);
  };

  render() {
    const { auth, user } = this.props;
    const url = window.location.pathname; //login画面での表示切替
    const links = auth.uid ? (
      <div className="text-right">
        {user ? (
          <div>
            <Dropdown className="mr-3" style={{ display: "inline-block" }}>
              <Dropdown.Toggle
                as={CustomToggle}
                id="dropdown-custom-components"
              >
                <img
                  src={user.avatarUrl}
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                  alt="userIcon"
                />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link to={`/users/${auth.uid}`}>プロフィール</Link>
                </Dropdown.Item>
                <Dropdown.Item onClick={this.props.logout}>
                  ログアウト
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <button
              className="btn btn-primary ml-2"
              onClick={this.handleToCreatePage}
            >
              New
            </button>
          </div>
        ) : null}
      </div>
    ) : (
      <div className="text-right">
        {url == "/login" ? null : (
          <Link className="btn btn-primary ml-2" to="/login">
            はじめる
          </Link>
        )}
      </div>
    );

    return (
      <nav className="navbar navbar-light bg-white header-navi">
        <div className="container">
          <Link to="/" className="navbar-brand mb-0 h1">
            Devmap
          </Link>
          {links}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  const id = state.firebase.auth.uid;
  const users = state.firestore.data.users;
  // var user = users.filter(function(element) {
  //   return (element.id = id);
  // });
  // users ? console.log(users) : console.log("");
  // users & users.map(ele => console.log(ele.id));
  const user = users ? users[id] : null;
  return {
    user: user,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([
    {
      collection: "users"
    }
  ])
)(withRouter(Navbar));
