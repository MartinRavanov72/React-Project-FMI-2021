import { AUTH, FETCH_ALL, FETCH_USER, UPDATE, START_LOADING, END_LOADING } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getUsers = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data: { data, currentPage, numberOfPages } } = await api.fetchUsers(page);
    
    dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchUser(id);

    dispatch({ type: FETCH_USER, payload: { user: data.user, albums: data.albums } });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = (id, user, history) => async (dispatch) => {
  try {
    const { data } = await api.updateUser(id, user);

    dispatch({ type: UPDATE, payload: data });

    history.push(`/users`);
  } catch (error) {
    console.log(error);
  }
};

export const signIn = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};

export const signUp = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};


