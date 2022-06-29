import React, {Component, useEffect, useRef, useState} from "react";
import TutorialDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";
import store from '../redux/store';

const TutorialsList= ({
}) => {


  const [state, setState] = useState({tutorials: store.getState().tutorials,
    currentTutorial: null,
    currentIndex: -1,
    searchTitle: ""
  })

  let tutorials = [];
  let currentTutorial = {};

  useEffect(() => {
    retrieveTutorials();
  }, []);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;

    setState({
      searchTitle: searchTitle
    });
  }

  const retrieveTutorials = () => {
      store.subscribe(data => {
        setState({
          tutorials: store.getState().tutorials
        });
        console.log(store.getState().tutorials);
      });

    if (!state.tutorials.length) {
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
    }
  }

  const refreshList = () => {
    retrieveTutorials();
    setState({
      currentTutorial: null,
      currentIndex: -1
    });
  }

  const setActiveTutorial = (tutorial, index) => {
    setState({
      currentTutorial: tutorial,
      currentIndex: index
    });
  }

  const removeAllTutorials = (repositoryIndex) => {
    let result = store.dispatch({
      type: 'deleteById',
      payload: {
        currentIndex: repositoryIndex,
      }
    });
  }

  const searchTitle = () => {
    TutorialDataService.findByTitle()
      .then(response => {
        if (response.data.error) {
          setState({
            tutorials: []
          });
          return;
        }

        if (response.data) {
          setState({
            tutorials: response.data.filter(res => res.name.includes(state.searchTitle))
          });
        }
      })
      .catch(e => {
      });
  }

  return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="Search by title"
                value={searchTitle}
                onChange={onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={searchTitle}
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
            {state.tutorials &&
            state.tutorials.map((tutorial, index) => (
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
                      onClick={() => removeAllTutorials(index)}
                  >
                    Delete
                  </button></td>
                </tr>
            ))}

            </tbody>
          </table>

          <button
              className="m-3 btn btn-sm btn-danger"
              onClick={removeAllTutorials}
          >
            Show All
          </button>
        </div>

      </div>
  );
}

export default TutorialsList;
