import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createOverview } from "../../store/actions/overviewActions";

class OverviewCreate extends Component {
  state = {
    title: "",
    description: "",
    key: this.props.match.params.id
  };

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.createOverview(this.state); // ①createProject Actionにstateを渡す
    this.props.history.push(`/overviews/${this.props.match.params.id}`);
  };

  render() {
    const { title, description } = this.state;
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/login" />;
    return (
      <div className="container mt-4 overview-wrapper">
        <div className="panel panel-default">
          <div className="panel-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={title}
                  onChange={this.onChange}
                  placeholder="Title"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={description}
                  onChange={this.onChange}
                  placeholder="Description"
                  cols="80"
                  rows="3"
                />
              </div>
              <button type="submit" className="btn btn-success">
                Submit
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
    createOverview: overview => dispatch(createOverview(overview))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OverviewCreate);
