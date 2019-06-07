import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { unsubscribe } from "../../store/actions/authActions";
import Twemoji from "react-twemoji";
import Helmet from "react-helmet";

class UserShow extends Component {
  onClick = e => {
    // console.log(this.props.match.params.id);
    this.props.unsubscribe(this.props.match.params.id);
    this.props.history.push("/login");
  };

  render() {
    const { user, overviews, auth } = this.props;
    const overviewNodes =
      overviews &&
      overviews.map(overview => {
        return overview.authorID === this.props.match.params.id ? (
          <div className="wrapper">
            <h5>
              <Link to={`/overviews/${overview.key}`}>
                {overview.title}
                <br />
              </Link>
            </h5>
          </div>
        ) : null;
      });
    let unsubscribeNodes;
    if (auth.uid === this.props.match.params.id) {
      unsubscribeNodes = (
        <button className="btn btn-danger" onClick={this.onClick}>
          退会する
        </button>
      );
    }

    return (
      <Fragment>
        <div className="text-center mt-5">
          <Twemoji
            style={{ display: "inline-block" }}
            options={{ className: "nav-twemoji" }}
            className="mr-3"
          >
            😉
          </Twemoji>
          {user ? (
            <Fragment>
              <h6 className="mt-1">{user.name}</h6>
              <Helmet>
                <title>{user.name}さんのプロフィール | Devmap</title>
              </Helmet>
            </Fragment>
          ) : null}
        </div>
        {overviewNodes}
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const users = state.firestore.data.users;
  const user = users ? users[id] : null;

  return {
    overviews: state.firestore.ordered.overviews,
    user: user,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    unsubscribe: id => dispatch(unsubscribe(id))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "overviews" }])
)(UserShow);
