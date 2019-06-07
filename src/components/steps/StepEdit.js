import React, { Component } from "react";
import ReactDOM from "react-dom";
import { editStep } from "../../store/actions/stepActions";

const editElement = (step, state, onChange) => (
  <div className="mt-2">
    <form>
      <div className="form-group">
        <label htmlFor="title" className="text-secondary">
          Edit STEP
        </label>
        <input
          type="text"
          className="form-control"
          name="title"
          value={state.title}
          onChange={onChange}
          placeholder="Title"
        />
        <input
          type="text"
          className="form-control mt-2"
          name="link"
          value={state.link}
          onChange={onChange}
          placeholder="https://..."
        />
        <textarea
          className="form-control mt-2"
          name="description"
          value={state.description}
          onChange={onChange}
          placeholder="学習の際の注意点やコツなど"
          cols="80"
          rows="3"
        />
      </div>
      <button type="submit" className="btn btn-success">
        Edit
      </button>
    </form>
  </div>
);

const StepEdit = (step, state, onChange) => {
  // console.log(state);
  state = step;
  return ReactDOM.render(
    <div>{editElement(step, state, onChange)}</div>,
    document.getElementById(step.id)
  );
};

const mapDispatchToProps = dispatch => {
  return {
    editStep: step => dispatch(editStep(step))
  };
};

export default StepEdit;
