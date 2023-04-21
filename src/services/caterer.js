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

export async function getAllCaterersByArea(areaId) {
  try {
    const { data } = await http.get(
      `${process.env.REACT_APP_API_ENDPOINT}/caterers/area?area=${areaId}`
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

export async function reviewCatererById(id, review) {
  try {
    const { data } = await http.post(
      `${process.env.REACT_APP_API_ENDPOINT}/caterers/reviews/${id}`,
      review
    );

    return data;
  } catch (error) {
    throw error;
  }
}

export async function bookmarkCatererById(id) {
  try {
    const { data } = await http.put(
      `${process.env.REACT_APP_API_ENDPOINT}/caterers/bookmark/${id}`
    );

    return data;
  } catch (error) {
    throw error;
  }
}
