import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

//action creater
import { deleteOverview } from "../../store/actions/overviewActions";
import StepCreate from "../steps/StepCreate";
import StepsShow from "../steps/StepsShow";

// add fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

// others
import Helmet from "react-helmet";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  PocketShareButton,
  PocketIcon
} from "react-share";

class OverviewShow extends Component {
  render() {
    const { auth, overviews } = this.props;

    // Delete this overview
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
            {/* Handle meta data */}
            <Helmet
              title={`${overview.title} | ${
                overview.authorName
              }さんのロードマップ`}
            />
            <div style={{ padding: "2rem" }}>
              <img
                src={overview.eyeCatchImg}
                style={{ width: "100%", display: "block", margin: "0 auto" }}
                alt="eyeCatch"
              />
              <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                {overview.description}
              </p>
              <div className="mb-4 share-links">
                <FacebookShareButton
                  className="d-inline-block mr-4 pointer"
                  url={`https://devmap.work/overviews/${overview.id}`}
                >
                  <FacebookIcon size={40} round />
                </FacebookShareButton>
                <TwitterShareButton
                  className="d-inline-block pointer mr-4"
                  url={`https://devmap.work/overviews/${overview.id}`}
                >
                  <TwitterIcon size={40} round />
                </TwitterShareButton>
                <PocketShareButton
                  className="d-inline-block pointer"
                  url={`https://devmap.work/overviews/${overview.id}`}
                >
                  <PocketIcon size={40} round />
                </PocketShareButton>
              </div>
              <Link to={`/users/${overview.authorID}`}>
                <img
                  src={overview.authorImage}
                  style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                  alt="authorImg"
                />{" "}
                {overview.authorName}
              </Link>
            </div>
            {/* display edit & delete links if author */}
            {overview.authorID === auth.uid ? (
              <div className="text-right mr-5">
                <Link
                  to={`/edit/${overview.id}`}
                  className="mr-4"
                  key={overview.id}
                >
                  <FontAwesomeIcon icon={faPencilAlt} />
                </Link>

                {/* Delete with Confirmation */}
                <Link
                  className="ml-3"
                  onClick={e => {
                    if (window.confirm("本当に削除しますか?"))
                      click(e, overview.id);
                  }}
                >
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
    return <div className="mt-4 mb-5 overview-wrapper">{overviewNodes}</div>;
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
