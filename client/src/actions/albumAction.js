import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_ALBUM, CREATE, UPDATE, DELETE, COMMENT } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getAlbum = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchAlbum(id);

    dispatch({ type: FETCH_ALBUM, payload: { album: data } });
  } catch (error) {
    console.log(error);
  }
};

export const getAlbums = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data: { data, currentPage, numberOfPages } } = await api.fetchAlbums(page);

    dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createAlbum = (album, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    
    const { data } = await api.createAlbum(album);

    dispatch({ type: CREATE, payload: data });

    history.push(`/albums/${data._id}`);
  } catch (error) {
    console.log(error);
  }
};

export const updateAlbum = (id, album) => async (dispatch) => {
  try {
    const { data } = await api.updateAlbum(id, album);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const commentAlbum = (id, comment, history) => async (dispatch) => {
  try {
    const { data } = await api.commentAlbum(id, comment);

    dispatch({ type: COMMENT, payload: data });

    history.push(`/albums`);
  } catch (error) {
    console.log(error);
  }
};

export const deleteAlbum = (id) => async (dispatch) => {
  try {
    await await api.deleteAlbum(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
