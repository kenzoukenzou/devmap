import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { unsubscribe } from "../../store/actions/authActions";

class UserShow extends Component {
  onClick = e => {
    // console.log(this.props.match.params.id);
    this.props.unsubscribe(this.props.match.params.id);
    this.props.history.push("/login");
  };

  render() {
    const { user, projects, auth } = this.props;
    const projectNodes =
      projects &&
      projects.map(project => {
        return project.authorID === this.props.match.params.id ? (
          <Link to={`/projects/${project.id}`}>
            {project.title}
            <br />
          </Link>
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
      <div>
        <div>{user ? <h6>{user.name}</h6> : null}</div>
        <div>{projectNodes}</div>
        {unsubscribeNodes}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const users = state.firestore.data.users;
  const user = users ? users[id] : null;

  return {
    projects: state.firestore.ordered.projects,
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
  firestoreConnect([{ collection: "projects" }])
)(UserShow);
