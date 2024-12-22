// src/constants/apiEndpoints.js
const BASE_URL = 'http://localhost:5000';

const API_ENDPOINTS = {
  GET_POSTS: `${BASE_URL}/api/posts`,
  DELETE_POST: (id) => `${BASE_URL}/api/posts/${id}`,
  CREATE_POST: `${BASE_URL}/api/posts`,
};

export default API_ENDPOINTS;
