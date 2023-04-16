import http from './http';

export async function getMenuById(id) {
  try {
    const { data } = await http.get(
      `${process.env.REACT_APP_API_ENDPOINT}/menus/${id}`
    );

    return data;
  } catch (error) {
    throw error;
  }
}

export async function reviewMenuById(id, review) {
  try {
    const { data } = await http.post(
      `${process.env.REACT_APP_API_ENDPOINT}/menus/reviews/${id}`,
      review
    );

    return data;
  } catch (error) {
    throw error;
  }
}
