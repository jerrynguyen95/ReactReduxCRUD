const initState = {
  tutorials: [],
  currentTutorial: null,
  currentIndex: -1,
  searchTitle: ""
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case 'getAll':
      return {
        ...state,
        tutorials: action.payload.tutorials
        ,
      }
    case 'deleteById':
      let result = [...state.tutorials];
      result.splice(action.payload.currentIndex, 1);

      return {
        ...state,
        tutorials: result,
      }
    case 'add':
      return {
        ...state,
        tutorials: [
          ...state.tutorials,
          action.payload.currentTutorial
        ],
      }
    default:
      return state;
  }
};

export default rootReducer;