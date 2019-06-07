import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../store/actions/authActions";
import Twemoji from "react-twemoji";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import uuid from "uuid";
import { withRouter } from "react-router";

// handleToCreatePage = e => {
//   const newUuid = uuid.v4();
//   this.props.history.push(`/create/${newUuid}`);
//   // return <Redirect to={`/create/${newUuid}`} />;
//   // props.history.push(`/create/${newUuid}`);
// };

class Navbar extends Component {
  handleToCreatePage = () => {
    // this.props.history.push("/create");
    this.props.history.push(`/create/${uuid.v4()}`);
  };

  render() {
    const { auth, user } = this.props;
    const links = auth.uid ? (
      <div className="text-right">
        {user ? (
          <Link to={`/users/${auth.uid}`}>
            {" "}
            <Twemoji
              style={{ display: "inline-block" }}
              options={{ className: "nav-twemoji" }}
              className="mr-3"
            >
              😉
            </Twemoji>
          </Link>
        ) : null}
        <a onClick={this.props.logout} className="btn btn-danger text-white">
          Logout
        </a>
        <button
          className="btn btn-primary ml-2"
          onClick={this.handleToCreatePage}
        >
          New
        </button>
      </div>
    ) : (
      <div className="text-right">
        <Link className="btn btn-primary ml-2" to="/signup">
          SINGUP
        </Link>
      </div>
    );

    return (
      <nav className="navbar navbar-light bg-light">
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
