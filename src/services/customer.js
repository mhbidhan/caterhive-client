import http from './http';

export async function getOwnData(populate = false) {
  try {
    const { data } = await http.get(
      `${process.env.REACT_APP_API_ENDPOINT}/customers/own?populate=${
        populate ? '1' : '0'
      }`
    );

    return data;
  } catch (error) {
    throw error;
  }
}

export async function createNewCustomer(newCustomer) {
  try {
    const { data } = await http.post(
      `${process.env.REACT_APP_API_ENDPOINT}/customers`,
      newCustomer
    );

    return data;
  } catch (error) {
    throw error;
  }
}

export async function loginCustomer(email, password) {
  try {
    const { data } = await http.post(
      `${process.env.REACT_APP_API_ENDPOINT}/customers/login`,
      { email, password }
    );

    localStorage.setItem('token', data);

    return data;
  } catch (error) {
    throw error;
  }
}
