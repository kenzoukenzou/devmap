import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Helmet from "react-helmet";
import { Facebook } from "react-content-loader";

class Overviews extends Component {
  render() {
    const { overviews } = this.props;
    // if (!auth.uid) return <Redirect to="/login" />;

    return (
      <div className="mt-4">
        <Helmet title="Devmap | 独学ロードマップ共有サービス" />
        {overviews ? (
          overviews.map(overview => (
            <Link to={`/overviews/${overview.key}`}>
              <div className="overview_card clearfix">
                <img
                  src={overview.eyeCatchImg}
                  alt="eyecatchImg"
                  className="float-left eyecatch"
                />
                <div className="float-left ml-5 mt-5 summary">
                  <h5>
                    <Link to={`/overviews/${overview.key}`}>
                      {overview.title}
                    </Link>
                  </h5>
                  <Link to={`/users/${overview.authorID}`}>
                    <img
                      src={overview.authorImage}
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%"
                      }}
                      alt="authorImg"
                    />{" "}
                    {overview.authorName}
                  </Link>
                </div>
              </div>
            </Link>
          ))
        ) : (
          // <Skeleton className="ml-5 overview_card" height={200} count={3} />
          <Facebook />
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
