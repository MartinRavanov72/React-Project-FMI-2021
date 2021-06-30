import { FETCH_ALL, FETCH_EVENT, CREATE, UPDATE, DELETE, GOTO, START_LOADING, END_LOADING } from '../constants/actionTypes';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = { isLoading: true, events: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        events: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_EVENT:
      return { ...state, event: action.payload.event };
    case GOTO:
      return { ...state, events: state.events.map((event) => (event._id === action.payload._id ? action.payload : event)) };
    case CREATE:
      return { ...state, events: [...state.events, action.payload] };
    case UPDATE:
      return { ...state, events: state.events.map((event) => (event._id === action.payload._id ? action.payload : event)) };
    case DELETE:
      return { ...state, events: state.events.filter((event) => event._id !== action.payload) };
    default:
      return state;
  }
};

