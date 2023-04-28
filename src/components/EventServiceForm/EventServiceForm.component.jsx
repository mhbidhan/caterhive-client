import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { EventServiceOrderContext } from '../../pages/EventServiceOrder/EventServiceOrder.page';
import { makePayment } from '../../services/payment';
import EventServiceCart from '../EventServiceCart/EventServiceCart.component';
import CustomButton from './../common/CustomButton/CustomButton.component';
import InputField from './../common/InputField/InputField.component';
import './EventServiceForm.styles.scss';
import eventServiceOrderValidatorSchema from './EventServiceForm.validator';

const EventServiceForm = () => {
  const { formData, updateForm, setView } = useContext(
    EventServiceOrderContext
  );
  const user = useSelector((state) => state.user);
  const [errorMessages, setErrorMessages] = useState(null);

  const handleChange = (e) => {
    setErrorMessages(null);
    const { name, value } = e.target;

    updateForm({
      [name]: value,
    });
  };

  const { shippingAddress, specialInstruction } = formData;

  const handlePayment = async (e) => {
    e.preventDefault();

    const { error } = eventServiceOrderValidatorSchema.validate(formData);

    if (error) {
      setErrorMessages({
        [error?.details[0]?.path[0]]: error?.message,
      });
      return;
    }

    localStorage.setItem('isEventOrder', 'true');
    localStorage.setItem('eventOrderCreds', JSON.stringify({ ...formData }));

    makePayment({
      amount: formData.orderValue - formData.discount,
      shippingAddress,
      customerEamil: user.email,
      customerPhone: user.phone,
      customerName: user.fullName,
    });
  };

  return (
    <div>
      <form onSubmit={handlePayment} className="event-service-from padding-top">
        <InputField
          label={'Shipping Address'}
          name={'shippingAddress'}
          value={shippingAddress}
          element="textArea"
          handleChange={handleChange}
          error={errorMessages?.shippingAddress}
        />
        <InputField
          label={'Special Instruction'}
          name={'specialInstruction'}
          value={specialInstruction}
          element="textArea"
          handleChange={handleChange}
          error={errorMessages?.specialInstruction}
        />
        <div className="btn-container">
          <CustomButton
            label={'Back'}
            handleClick={() => setView(<EventServiceCart />)}
          />
          <CustomButton
            handleClick={handlePayment}
            label={'Payment'}
            primary={true}
          />
        </div>
      </form>
    </div>
  );
};

export default EventServiceForm;
