import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

// handle redux
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { deleteStep } from "../../store/actions/stepActions";
import { editStep } from "../../store/actions/stepActions";

// others
import Skeleton from "react-loading-skeleton";
import { Modal } from "react-bootstrap";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  PocketShareButton,
  PocketIcon
} from "react-share";

class StepsShow extends Component {
  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      title: "",
      description: "",
      link: "",
      createdAt: "",
      show: false
    };
  }

  // handel modal window
  handleShow = step => {
    this.setState({ ...step, show: true });
  };

  handleClose() {
    this.setState({ show: false });
  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.editStep(this.state);
    this.setState({ show: false });
  };

  render() {
    const { steps, auth } = this.props;
    const targetStep = this.state; // 編集対象のStep

    // handle delete
    const handleDelete = id => {
      this.props.deleteStep(id);
    };

    let stepCount = 0;
    const stepNodes =
      steps &&
      steps.map(step => {
        return step.overviewID === this.props.overviewID ? (
          <Fragment>
            <ul className="timeline">
              <li>
                <label className="label">
                  STEP{stepCount + 1}
                  {(() => {
                    stepCount++;
                  })()}
                </label>
                <div className="wrapper" id={step.id}>
                  <h5>
                    {step.title}
                    {"  "}
                    {/* display link if exists */}
                    {step.link ? (
                      <a target="_blank" href={step.link}>
                        <FontAwesomeIcon icon={faLink} />
                      </a>
                    ) : null}
                  </h5>
                  <p style={{ fontSize: "0.9em" }}>{step.description}</p>
                  {/* display delete button if author */}
                  {step.authorID === auth.uid ? (
                    <div className="text-right">
                      <Link
                        className="mr-3"
                        onClick={e => this.handleShow(step)}
                      >
                        <FontAwesomeIcon icon={faPencilAlt} />
                      </Link>
                      <Link
                        className="ml-3"
                        onClick={e => handleDelete(step.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Link>
                    </div>
                  ) : null}
                </div>
              </li>
            </ul>
          </Fragment>
        ) : null;
      });
    return (
      <div className="mt-4">
        <Modal
          size="lg"
          centered
          show={this.state.show}
          onHide={this.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">編集</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.onSubmit}>
              <input
                type="text"
                className="form-control"
                name="title"
                value={targetStep.title}
                onChange={this.onChange}
                // placeholder="Title"
              />
              <input
                type="text"
                className="form-control"
                name="link"
                value={targetStep.link}
                onChange={this.onChange}
              />
              <textarea
                type="text"
                className="form-control"
                name="description"
                value={targetStep.description}
                cols="80"
                rows="3"
                onChange={this.onChange}
              />
              <button className="btn btn-primary">Edit</button>
            </form>
          </Modal.Body>
          <Modal.Footer />
        </Modal>

        {(
          <Fragment>
            {stepNodes}
            <div className="text-center mt-5 mb-4">
              <FacebookShareButton
                className="d-inline-block mr-3 pointer"
                url={window.location.href}
              >
                <FacebookIcon size={40} round />
              </FacebookShareButton>
              <TwitterShareButton
                className="d-inline-block pointer mr-3"
                url={window.location.href}
              >
                <TwitterIcon size={40} round />
              </TwitterShareButton>
              <PocketShareButton
                className="d-inline-block pointer"
                url={window.location.href}
              >
                <PocketIcon size={40} round />
              </PocketShareButton>
            </div>
          </Fragment>
        ) || <Skeleton className="ml-5 wrapper" height={200} count={3} />}
      </div>
    );
  }
}

// project.id === comment.projectID
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    steps: state.firestore.ordered.steps
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteStep: step => dispatch(deleteStep(step)),
    editStep: step => dispatch(editStep(step))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "steps", orderBy: ["createdAt", "asc"] }])
)(StepsShow);
