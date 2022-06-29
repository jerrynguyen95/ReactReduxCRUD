import React, {useState} from "react";
import store from '../redux/store';
import {useHistory} from 'react-router-dom';

const AddTutorial = ({
}) => {
  const history = useHistory();

  const [state, setState] = useState({
    id: null,
    title: "",
    description: "",
    watchers_count: "",
    open_issues: "",
    private: false,
    published: false,
    redirect: null,
    submitted: false
  });

  const onChangeTitle =(e) => {
    setState({
      ...state,
      title: e.target.value
    });
  }

  const onChangeDescription = (e) => {
    setState({
      ...state,
      description: e.target.value
    });
  }
  const onChangeDescription1 = (e) => {
    setState({
      ...state,
      watchers_count: e.target.value
    });
  }
  const onChangeDescription2 = (e) => {
    setState({
      ...state,
      open_issues: e.target.value
    });
  }
  const onChangeDescription3 = (e) => {
    setState({
      ...state,
      private: e.target.value
    });
  }

  const saveTutorial = () => {
    var data = {
      id: Math.random(),
      name: state.title,
      description: state.description,
      watchers_count: state.watchers_count,
      open_issues: state.open_issues,
      private: state.private
    };

    store.dispatch({
      type: 'add',
      payload: {
        currentTutorial: data,
        currentIndex: -1,
        searchTitle: ""
      }
    });

    history.goBack();
  }

  const newTutorial = () => {
    setState({
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

    return (
      <div className="submit-form">
        {state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={newTutorial}>
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
                value={state.title}
                onChange={onChangeTitle}
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
                value={state.description}
                onChange={onChangeDescription}
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
                  value={state.watchers_count}
                  onChange={onChangeDescription1}
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
                  value={state.open_issues}
                  onChange={onChangeDescription2}
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
                  value={state.private}
                  onChange={onChangeDescription3}
                  name="description"
              />
            </div>

            <button onClick={saveTutorial} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
};

export default AddTutorial;