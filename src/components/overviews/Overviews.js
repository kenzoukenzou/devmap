import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Twemoji from "react-twemoji";

class Overviews extends Component {
  render() {
    const { auth, overviews } = this.props;
    if (!auth.uid) return <Redirect to="/login" />;

    return (
      <div className="mt-4">
        {overviews &&
          overviews.map(overview => (
            <div className="wrapper">
              <h5>
                <Link to={`/overviews/${overview.key}`}>{overview.title}</Link>
              </h5>

              <Link to={`/users/${overview.authorID}`}>
                <Twemoji
                  style={{ display: "inline-block" }}
                  options={{ className: "twemoji" }}
                  className="mr-1"
                >
                  😉
                </Twemoji>
                {overview.authorName}
              </Link>
            </div>
          ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    overviews: state.firestore.ordered.overviews,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "overviews",
      orderBy: ["createdAt", "desc"]
    },
    {
      collection: "users"
    }
  ])
)(Overviews);
