import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import store from '../redux/store';
import { Redirect } from "react-router-dom";

export default class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDescription1 = this.onChangeDescription1.bind(this);
    this.onChangeDescription2 = this.onChangeDescription2.bind(this);
    this.onChangeDescription3 = this.onChangeDescription3.bind(this);
    this.saveTutorial = this.saveTutorial.bind(this);
    this.newTutorial = this.newTutorial.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "",
      watchers_count: "",
      open_issues: "",
      private: false,
      published: false,
      redirect: null,
      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }
  onChangeDescription1(e) {
    this.setState({
      watchers_count: e.target.value
    });
  }
  onChangeDescription2(e) {
    this.setState({
      open_issues: e.target.value
    });
  }
  onChangeDescription3(e) {
    this.setState({
      private: e.target.value
    });
  }

  saveTutorial() {
    var data = {
      id: Math.random(),
      name: this.state.title,
      description: this.state.description,
      watchers_count: this.state.watchers_count,
      open_issues: this.state.open_issues,
      private: this.state.private
    };

    store.dispatch({
      type: 'add',
      payload: {
        currentTutorial: data,
        currentIndex: -1,
        searchTitle: ""
      }
    });

    this.setState({
      redirect: "/"
    });
  }

  newTutorial() {
    this.setState({
      id: null,
      title: "",
      description: "",
      watchers_count: "",
      open_issues: "",
      private: false,
      published: false,

      submitted: false
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newTutorial}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">name</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>
            {/*name	description	watchers_count		open_issues	private*/}

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">watchers_count</label>
              <input
                  type="text"
                  className="form-control"
                  id="description"
                  required
                  value={this.state.watchers_count}
                  onChange={this.onChangeDescription1}
                  name="description"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">open_issues</label>
              <input
                  type="text"
                  className="form-control"
                  id="description"
                  required
                  value={this.state.open_issues}
                  onChange={this.onChangeDescription2}
                  name="description"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">private</label>
              <input
                  type="checkbox"
                  className="form-control"
                  id="description"
                  required
                  value={this.state.private}
                  onChange={this.onChangeDescription3}
                  name="description"
              />
            </div>

            <button onClick={this.saveTutorial} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
