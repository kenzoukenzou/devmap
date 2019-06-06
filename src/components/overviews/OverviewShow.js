import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
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

class OverviewShow extends Component {
  render() {
    const { auth, projects } = this.props;

    const click = (e, props) => {
      e.preventDefault();
      this.props.deleteProject(props);
      this.props.history.push("/");
    };

    const projectNodes =
      projects &&
      projects.map(project => {
        return project ? (
          <div>
            <h4>{project.title}</h4>
            {project.authorID === auth.uid ? (
              <div className="text-right pr-3">
                <Link to={`/edit/${project.id}`} key={project.id}>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </Link>
                {/*  @@TODO */}
                {/* Clickイベントに対して引数を渡す */}
                <Link className="ml-3" onClick={e => click(e, project.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </Link>
              </div>
            ) : null}
            <StepsShow projectID={project.id} />
            {project.authorID === auth.uid && (
              <StepCreate projectID={project.id} />
            )}
          </div>
        ) : null;
      });

    if (!auth.uid) return <Redirect to="/login" />;
    return <div className="mt-4">{projectNodes}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const allprojects = state.firestore.ordered.projects;
  const projects =
    allprojects &&
    allprojects.map(doc => {
      if (doc.key === id) return doc;
    });
  return {
    projects: projects,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteProject: project => dispatch(deleteOverview(project))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "projects" }])
)(OverviewShow);
