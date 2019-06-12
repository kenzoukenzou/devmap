import React, { Component } from "react";
import { connect } from "react-redux";
import { createStep } from "../../store/actions/stepActions";

class StepCreate extends Component {
  state = {
    title: "",
    link: "",
    description: "",
    overviewID: this.props.overviewID
  };

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.createStep(this.state);
    this.setState({
      title: "",
      link: "",
      description: ""
    });
  };
  render() {
    const { title, link, description } = this.state;
    return (
      <div className="ml-4 mt-5 mb-5 mr-4">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="title" className="text-secondary">
              Add STEP
            </label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={title}
              onChange={this.onChange}
              placeholder="Title"
            />
            <input
              type="text"
              className="form-control mt-2"
              name="link"
              value={link}
              onChange={this.onChange}
              placeholder="https://..."
            />
            <textarea
              className="form-control mt-2"
              name="description"
              value={description}
              onChange={this.onChange}
              placeholder="学習の際の注意点やコツなど"
              cols="80"
              rows="3"
            />
          </div>
          <button type="submit" className="btn btn-success">
            Add
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createStep: step => dispatch(createStep(step))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(StepCreate);
