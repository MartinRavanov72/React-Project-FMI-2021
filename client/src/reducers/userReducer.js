import { FETCH_ALL, FETCH_USER, UPDATE, AUTH, START_LOADING, END_LOADING, LOGOUT } from '../constants/actionTypes';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = { isLoading: true, users: [] }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data, loading: false, errors: null };
    case LOGOUT:
      localStorage.clear();

      return { ...state, authData: null, loading: false, errors: null };
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        users: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_USER:
      return { ...state, user: action.payload.user, albums: action.payload.albums};
    case UPDATE:
      return { ...state, users: state.users.map((user) => (user._id === action.payload._id ? action.payload : user)) };
    default:
      return state;
  }
};

