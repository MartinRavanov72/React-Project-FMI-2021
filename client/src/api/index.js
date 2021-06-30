import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const fetchUser = (id) => API.get(`/users/${id}`);
export const fetchUsers = (page) => API.get(`/users?page=${page}`);
export const updateUser = (id, updatedUser) => API.patch(`/users/${id}`, updatedUser);
export const signIn = (formData) => API.post('/users/signIn', formData);
export const signUp = (formData) => API.post('/users/signUp', formData);

export const fetchAlbum = (id) => API.get(`/albums/${id}`);
export const fetchAlbums = (page) => API.get(`/albums?page=${page}`);
export const createAlbum = (newAlbum) => API.post('/albums', newAlbum);
export const commentAlbum = (id, comment) => API.patch(`/albums/${id}/comment`, comment);
export const updateAlbum = (id, updatedAlbum) => API.patch(`/albums/${id}`, updatedAlbum);
export const deleteAlbum = (id) => API.delete(`/albums/${id}`);

export const fetchEvent = (id) => API.get(`/events/${id}`);
export const fetchEvents = (page) => API.get(`/events?page=${page}`);
export const createEvent = (newEvent) => API.post('/events', newEvent);
export const goToEvent = (id) => API.patch(`/events/${id}/goTo`);
export const updateEvent = (id, updatedEvent) => API.patch(`/events/${id}`, updatedEvent);
export const deleteEvent= (id) => API.delete(`/events/${id}`);
