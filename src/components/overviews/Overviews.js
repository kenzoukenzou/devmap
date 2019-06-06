import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class Overviews extends Component {
  render() {
    const { auth, overviews } = this.props;
    if (!auth.uid) return <Redirect to="/login" />;

    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-body">
            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Author</th>
                </tr>
              </thead>
              <tbody>
                {overviews &&
                  overviews.map(overview => (
                    <tr>
                      <td>
                        <Link to={`/overviews/${overview.key}`}>
                          {overview.title}
                        </Link>
                      </td>
                      <td>{overview.description}</td>
                      <td>
                        <Link to={`/users/${overview.authorID}`}>
                          {overview.authorName}
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
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
