import http from './http';

export async function getOrderById(id) {
  try {
    const { data } = await http.get(
      `${process.env.REACT_APP_API_ENDPOINT}/orders/${id}`
    );

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getOwnOrder() {
  try {
    const { data } = await http.get(
      `${process.env.REACT_APP_API_ENDPOINT}/orders/customers`
    );

    return data;
  } catch (error) {
    throw error;
  }
}

export async function createNewOrder(orderCreds) {
  try {
    const { data } = await http.post(
      `${process.env.REACT_APP_API_ENDPOINT}/orders`,
      orderCreds
    );

    return data;
  } catch (error) {
    throw error;
  }
}
