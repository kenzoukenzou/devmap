import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createOverview } from "../../store/actions/overviewActions";
import { Helmet } from "react-helmet";

class OverviewCreate extends Component {
  state = {
    title: "",
    description: "",
    key: this.props.match.params.id,
    error: ""
  };

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.state.title === "")
      return this.setState({ error: "タイトルを入力してください" });
    else if (this.state.title.includes("/"))
      return this.setState({ error: "タイトルに「/」を含めないでください" });
    else this.props.createOverview(this.state); // ①createProject Actionにstateを渡す
    this.props.history.push(`/overviews/${this.props.match.params.id}`);
  };

  render() {
    const { title, description, error } = this.state;
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/login" />;
    return (
      <div className="container mt-4 overview-wrapper">
        <Helmet>
          <title>新規作成 | Devmap</title>
        </Helmet>
        <div className="panel panel-default">
          <div className="panel-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="title">タイトル</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={title}
                  onChange={this.onChange}
                  placeholder="ex. HTMLとCSSを独学する方法"
                />
                {error ? <p className="text-danger">{error}</p> : null}
              </div>
              <div className="form-group">
                <label htmlFor="description">概要</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={description}
                  onChange={this.onChange}
                  placeholder="学習の際の注意点やコツなど"
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
