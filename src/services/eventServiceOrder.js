import http from './http';

export async function getEventServiceOrderById(id) {
  try {
    const { data } = await http.get(
      `${process.env.REACT_APP_API_ENDPOINT}/eventServiceOrders/${id}`
    );

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getOwnEventServiceOrders() {
  try {
    const { data } = await http.get(
      `${process.env.REACT_APP_API_ENDPOINT}/eventServiceOrders/customers`
    );

    return data;
  } catch (error) {
    throw error;
  }
}

export async function createNewEventServiceOrder(orderCreds) {
  try {
    const { data } = await http.post(
      `${process.env.REACT_APP_API_ENDPOINT}/eventServiceOrders`,
      orderCreds
    );

    return data;
  } catch (error) {
    throw error;
  }
}
