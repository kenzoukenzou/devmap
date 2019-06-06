import React, { Component } from "react";
import firebase from "../../Firebase";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { editOverview } from "../../store/actions/overviewActions";

class OverviewEdit extends Component {
  state = {
    title: "",
    description: "",
    key: "",
    authorName: "",
    authorID: ""
  };

  componentDidMount() {
    const ref = firebase
      .firestore()
      .collection("projects")
      .doc(this.props.match.params.id);
    ref.get().then(doc => {
      if (doc.exists) {
        const project = doc.data();
        this.setState({
          title: project.title,
          description: project.description,
          key: this.props.match.params.id,
          authorName: project.authorName,
          authorID: this.props.auth.uid
        });
      } else {
        console.log("ERROR");
      }
    });
  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = e => {
    e.preventDefault();
    this.propsOverview.editProject(this.state); // ①createProject Actionにstateを渡す
    this.props.history.push("/");
  };

  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/login" />;
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  placeholder="Title"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  placeholder="Description"
                />
              </div>

              <button type="submit" className="btn btn-success">
                Edit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editProject: project => dispatch(editOverview(project))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OverviewEdit);
