export async function makePayment({
  amount,
  customerName,
  customerEamil,
  customerPhone,
  shippingAddress,
}) {
  try {
    document.location = `${
      process.env.REACT_APP_API_ENDPOINT
    }/payment?amount=${amount}&customerName=${customerName}}&customerEamil=${customerEamil}&customerPhone=${customerPhone}&shippingAddress=${shippingAddress}&tran_id=${
      customerName + amount
    }`;

    // return data;
  } catch (error) {
    throw error;
  }
}
