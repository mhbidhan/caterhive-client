import http from './http';

export async function getAllAreas() {
  try {
    const allAreas = await http.get(
      `${process.env.REACT_APP_API_ENDPOINT}/areas`
    );

    return allAreas.data;
  } catch (error) {
    console.log(error);
  }
}
