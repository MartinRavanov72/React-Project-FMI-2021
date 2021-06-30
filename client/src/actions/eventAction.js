import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_EVENT, CREATE, UPDATE, DELETE, GOTO } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getEvent = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchEvent(id);

    dispatch({ type: FETCH_EVENT, payload: { event: data } });
  } catch (error) {
    console.log(error);
  }
};

export const getEvents = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data: { data, currentPage, numberOfPages } } = await api.fetchEvents(page);

    dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createEvent = (event, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    
    const { data } = await api.createEvent(event);

    dispatch({ type: CREATE, payload: data });

    history.push(`/events/${data._id}`);
  } catch (error) {
    console.log(error);
  }
};

export const updateEvent = (id, event) => async (dispatch) => {
  try {
    const { data } = await api.updateEvent(id, event);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const goToEvent = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    const { data } = await api.goToEvent(id, user?.token);

    dispatch({ type: GOTO, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteEvent = (id) => async (dispatch) => {
  try {
    await await api.deleteEvent(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
