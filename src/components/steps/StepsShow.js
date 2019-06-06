import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class StepsShow extends Component {
  render() {
    const { comments } = this.props;
    let stepCount = 0;
    const commentNodes =
      comments &&
      comments.map(comment => {
        return comment.projectID === this.props.projectID ? (
          <div>
            <ul className="timeline">
              <li>
                <label
                  style={{
                    color: "#90969a",
                    fontSize: ".8em",
                    fontWeight: "bold"
                  }}
                >
                  STEP{stepCount + 1}
                  {(() => {
                    stepCount++;
                  })()}
                </label>
                <div
                  style={{
                    border: "solid 1px #dce4ec",
                    margin: "0 0 1em",
                    padding: "2em 1.9em 2em",
                    borderRadius: "4px"
                  }}
                >
                  <h5
                    style={{
                      fontSize: "1.1em",
                      fontWeight: "bold",
                      lineHeight: "1.5"
                    }}
                  >
                    {comment.title}
                    {"  "}
                    <a target="_blank" href={comment.link}>
                      <FontAwesomeIcon icon={faLink} />
                    </a>
                  </h5>
                  <p style={{ fontSize: "0.9em" }}>{comment.description}</p>
                </div>
              </li>
            </ul>
          </div>
        ) : null;
      });
    return <div>{commentNodes}</div>;
  }
}

// project.id === comment.projectID
const mapStateToProps = state => {
  return {
    steps: state.firestore.ordered.steps
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "steps", orderBy: ["createdAt", "asc"] }])
)(StepsShow);
