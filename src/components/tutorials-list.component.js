import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";
import store from '../redux/store';

export default class TutorialsList extends Component {

  static a = false;

  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle;
    this.retrieveTutorials = this.retrieveTutorials;
    this.refreshList = this.refreshList;
    this.setActiveTutorial = this.setActiveTutorial;
    this.removeAllTutorials = this.removeAllTutorials;
    this.searchTitle = this.searchTitle;

    this.state = {
      tutorials: store.getState().tutorials,
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveTutorials();
  }

  onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveTutorials = () => {
      store.subscribe(data => {
        this.setState({
          tutorials: store.getState().tutorials
        });
        console.log(store.getState().tutorials);
      });



  if (!TutorialsList.a) {
    TutorialDataService.getAll()
      .then(response => {
        if (response.data) {
          store.dispatch({
            type: 'getAll',
            payload: {
              tutorials: response.data,
              currentTutorial: null,
              currentIndex: -1,
              searchTitle: ""
            }
          });
        }

      })
      .catch(e => {
      });
    TutorialsList.a = true;
  }
  }

  refreshList = () => {
    this.retrieveTutorials();
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });
  }

  setActiveTutorial = (tutorial, index) => {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index
    });
  }

  removeAllTutorials = (repositoryIndex) => {
    let result = store.dispatch({
      type: 'deleteById',
      payload: {
        currentIndex: repositoryIndex,
      }
    });
  }

  searchTitle = () => {
    TutorialDataService.findByTitle()
      .then(response => {
        if (response.data.error) {
          this.setState({
            tutorials: []
          });
          return;
        }

        if (response.data) {
          this.setState({
            tutorials: response.data.filter(res => res.name.includes(this.state.searchTitle))
          });
        }
      })
      .catch(e => {
      });
  }

  render() {
    const { searchTitle, tutorials, currentTutorial, currentIndex, setTutorials } = this.state;

    return (
        <div className="list row">
          <div className="col-md-8">
            <div className="input-group mb-3">
              <input
                  type="text"
                  className="form-control"
                  placeholder="Search by title"
                  value={searchTitle}
                  onChange={this.onChangeSearchTitle}
              />
              <div className="input-group-append">
                <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={this.searchTitle}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <h4>User List</h4>

            <Link
                to={"/add"}
                className="m-3 btn btn-sm btn-danger"
            >
              Create new repository
            </Link>

            <table class="table">
              <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">name</th>
                <th scope="col">description</th>
                <th scope="col">watchers_count</th>
                <th scope="col">language</th>
                <th scope="col">open_issues</th>
                <th scope="col">private</th>

              </tr>
              </thead>
              <tbody>
              {tutorials &&
              tutorials.map((tutorial, index) => (
                  <tr>
                    <td>{tutorial.id}</td>
                    <td>{tutorial.name}</td>
                    <td>{tutorial.description}</td>
                    <td>{tutorial.watchers_count}</td>
                    <td>{tutorial.language}</td>
                    <td>{tutorial.open_issues}</td>
                    <td>{tutorial.private ? 'true' : 'false'}</td>
                    <td><button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={() => this.removeAllTutorials(index)}
                    >
                      Delete
                    </button></td>
                  </tr>
              ))}

              </tbody>
            </table>

            <button
                className="m-3 btn btn-sm btn-danger"
                onClick={this.removeAllTutorials}
            >
              Show All
            </button>
          </div>
          <div className="col-md-6">
            {currentTutorial ? (
                <div>
                  <h4>Tutorial</h4>
                  <div>
                    <label>
                      <strong>Title:</strong>
                    </label>{" "}
                    {currentTutorial.name}
                  </div>
                  <div>
                    <label>
                      <strong>Gender:</strong>
                    </label>{" "}
                    {currentTutorial.appearance.gender}
                  </div>
                  <div>
                    <label>
                      <strong>Weight:</strong>
                    </label>{" "}
                    {currentTutorial.appearance.weight.join(",")}
                  </div>

                  <Link
                      to={"/tutorials/" + currentTutorial.id}
                      className="badge badge-warning"
                  >
                    View detail
                  </Link>
                </div>
            ) : (
                <div>
                </div>
            )}
          </div>
        </div>
    );
  }
}
