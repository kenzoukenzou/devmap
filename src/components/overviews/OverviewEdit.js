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
    authorID: "",
    authorImage: "",
    error: ""
  };

  componentDidMount() {
    const ref = firebase
      .firestore()
      .collection("overviews")
      .doc(this.props.match.params.id);
    ref.get().then(doc => {
      if (doc.exists) {
        const overview = doc.data();
        this.setState({
          title: overview.title,
          description: overview.description,
          key: this.props.match.params.id,
          authorName: overview.authorName,
          authorID: this.props.auth.uid,
          authorImage: overview.authorImage
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
    if (this.state.title === "")
      return this.setState({ error: "タイトルを入力してください" });
    else if (this.state.title.includes("/"))
      return this.setState({ error: "タイトルに「/」を含めないでください" });
    else this.props.editOverview(this.state); // ①createProject Actionにstateを渡す
    this.props.history.push("/");
  };

  render() {
    const { auth } = this.props;
    const { error } = this.state;
    if (!auth.uid) return <Redirect to="/login" />;
    return (
      <div className="container mt-4 overview-wrapper">
        <div className="panel panel-default">
          <div className="panel-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="title">タイトル</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  placeholder="Title"
                />
                {error ? <p className="text-danger">{error}</p> : null}
              </div>
              <div className="form-group">
                <label htmlFor="description">概要</label>
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
    editOverview: overview => dispatch(editOverview(overview))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OverviewEdit);
