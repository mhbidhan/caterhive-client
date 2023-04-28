import { useCallback, useEffect } from 'react';
import useLoading from '../../hooks/useLoading';
import { createNewEventServiceOrder } from '../../services/eventServiceOrder';
import { createNewOrder } from '../../services/order';

const PaymentSuccessful = () => {
  const { startLoading, stopLoading } = useLoading();
  const makeOrder = useCallback(async () => {
    try {
      startLoading();
      const isEventOrder = localStorage.getItem('isEventOrder');
      console.log(isEventOrder);

      if (isEventOrder) {
        const eventOrderCreds = JSON.parse(
          localStorage.getItem('eventOrderCreds')
        );

        const newOrder = await createNewEventServiceOrder(eventOrderCreds);

        localStorage.removeItem('eventOrderCreds');
        stopLoading();
        document.location = `/eventOrder/${newOrder._id}`;

        localStorage.removeItem('isEventOrder');
      } else {
        const orderCreds = JSON.parse(localStorage.getItem('orderCreds'));

        const newOrder = await createNewOrder(orderCreds);

        localStorage.removeItem('cartData');
        localStorage.removeItem('orderCreds');
        stopLoading();
        document.location = `/myOrders/${newOrder._id}`;
      }
    } catch (error) {
      localStorage.removeItem('orderCreds');
      document.location = `/newOrder`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    makeOrder();
  }, [makeOrder]);
};

export default PaymentSuccessful;
