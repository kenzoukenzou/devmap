import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Twemoji from "react-twemoji";

//action creater
import { deleteOverview } from "../../store/actions/overviewActions";
import StepCreate from "../steps/StepCreate";
import StepsShow from "../steps/StepsShow";

// add fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import Helmet from "react-helmet";

class OverviewShow extends Component {
  render() {
    const { auth, overviews } = this.props;

    const click = (e, props) => {
      e.preventDefault();
      this.props.deleteoverview(props);
      this.props.history.push("/");
    };

    const overviewNodes =
      overviews &&
      overviews.map(overview => {
        return overview ? (
          <div>
            <Helmet>
              <title>
                {overview.title} | {overview.authorName}さんのロードマップ
              </title>
            </Helmet>
            <h4>{overview.title}</h4>
            <Link to={`/users/${overview.authorID}`}>
              <img
                src={overview.authorImage}
                style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                alt="authorImg"
              />{" "}
              {overview.authorName}
            </Link>
            {/* display edit & delete links if author */}
            {overview.authorID === auth.uid ? (
              <div className="text-right pr-3">
                <Link to={`/edit/${overview.id}`} key={overview.id}>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </Link>

                <Link className="ml-3" onClick={e => click(e, overview.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </Link>
              </div>
            ) : null}
            <StepsShow overviewID={overview.id} />
            {overview.authorID === auth.uid && (
              <StepCreate overviewID={overview.id} />
            )}
          </div>
        ) : null;
      });

    // if (!auth.uid) return <Redirect to="/login" />;
    return <div className="mt-4 overview-wrapper">{overviewNodes}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const alloverviews = state.firestore.ordered.overviews;
  const overviews =
    alloverviews &&
    alloverviews.map(doc => {
      if (doc.key === id) return doc;
    });
  return {
    overviews: overviews,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteoverview: overview => dispatch(deleteOverview(overview))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "overviews" }])
)(OverviewShow);
