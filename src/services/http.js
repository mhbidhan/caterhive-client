import axios from 'axios';

axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');

async function get(url) {
  try {
    return await axios.get(url);
  } catch (error) {
    if (error.response.status === 401) {
      localStorage.removeItem('token');
      return;
    }
    throw error;
  }
}

async function post(url, data) {
  try {
    return await axios.post(url, data);
  } catch (error) {
    if (error.response.status === 401) {
      localStorage.removeItem('token');
      return;
    }
    throw error;
  }
}

async function put(url, data) {
  try {
    return await axios.put(url, data);
  } catch (error) {
    if (error.response.status === 401) {
      localStorage.removeItem('token');
      return;
    }
    throw error;
  }
}

async function deleteReq(url) {
  try {
    return await axios.delete(url);
  } catch (error) {
    if (error.response.status === 401) {
      localStorage.removeItem('token');
      return;
    }
    throw error;
  }
}

const http = {
  get,
  post,
  put,
  delete: deleteReq,
};

export default http;
