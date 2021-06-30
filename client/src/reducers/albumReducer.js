import { FETCH_ALL, FETCH_ALBUM, CREATE, UPDATE, DELETE, COMMENT, START_LOADING, END_LOADING } from '../constants/actionTypes';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = { isLoading: true, albums: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        albums: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_ALBUM:
      return { ...state, album: action.payload.album };
    case COMMENT:
      return { ...state, albums: state.albums.map((album) => (album._id === action.payload._id ? action.payload : album)) };
    case CREATE:
      return { ...state, albums: [...state.albums, action.payload] };
    case UPDATE:
      return { ...state, albums: state.albums.map((album) => (album._id === action.payload._id ? action.payload : album)) };
    case DELETE:
      return { ...state, albums: state.albums.filter((album) => album._id !== action.payload) };
    default:
      return state;
  }
};

