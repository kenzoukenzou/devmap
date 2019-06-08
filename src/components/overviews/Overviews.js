import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Twemoji from "react-twemoji";
import Helmet from "react-helmet";
import CircularProgress from "@material-ui/core/CircularProgress";

class Overviews extends Component {
  render() {
    const { auth, overviews } = this.props;
    // if (!auth.uid) return <Redirect to="/login" />;

    return (
      <div className="mt-4">
        <Helmet>
          <title>Devmap | 独学ロードマップ共有サービス</title>
          <meta name="description" content="独学ロードマップ共有サービス" />
        </Helmet>
        {overviews ? (
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
          ))
        ) : (
          <div className="container text-center">
            <CircularProgress />
          </div>
        )}
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
