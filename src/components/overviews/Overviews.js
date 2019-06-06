import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class Overviews extends Component {
  render() {
    const { auth, projects } = this.props;
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
                {projects &&
                  projects.map(project => (
                    <tr>
                      <td>
                        <Link to={`/projects/${project.key}`}>
                          {project.title}
                        </Link>
                      </td>
                      <td>{project.description}</td>
                      <td>
                        <Link to={`/users/${project.authorID}`}>
                          {project.authorName}
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
    projects: state.firestore.ordered.projects,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "projects",
      orderBy: ["createdAt", "desc"]
    },
    {
      collection: "users"
    }
  ])
)(Overviews);
