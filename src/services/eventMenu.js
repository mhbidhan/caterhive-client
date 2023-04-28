import http from './http';

export async function getEventMenuById(id) {
  try {
    const { data } = await http.get(
      `${process.env.REACT_APP_API_ENDPOINT}/eventMenus/${id}`
    );

    return data;
  } catch (error) {
    throw error;
  }
}
