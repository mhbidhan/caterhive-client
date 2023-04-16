import http from './http';

export async function getAllCaterers() {
  try {
    const { data } = await http.get(
      `${process.env.REACT_APP_API_ENDPOINT}/caterers`
    );

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getCatererById(id) {
  try {
    const { data } = await http.get(
      `${process.env.REACT_APP_API_ENDPOINT}/caterers/${id}`
    );

    return data;
  } catch (error) {
    throw error;
  }
}

export async function bookmarkCatererById(id) {
  try {
    const { data } = await http.put(
      `${process.env.REACT_APP_API_ENDPOINT}/caterer/bookmark/${id}`
    );

    return data;
  } catch (error) {
    throw error;
  }
}
