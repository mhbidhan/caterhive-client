import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { NewOrderContext } from '../../pages/NewOrder/NewOrder.page';
import { makePayment } from '../../services/payment';
import OrderCart from '../NewOrderCart/NewOrderCart.component';
import CustomButton from './../common/CustomButton/CustomButton.component';
import InputField from './../common/InputField/InputField.component';
import './NewOrderForm.styles.scss';
import newOrderValidatorSchema from './newOrderFrom.validator';

const NewOrderForm = () => {
  const { formData, setFormData, setView, amount } =
    useContext(NewOrderContext);
  const user = useSelector((state) => state.user);
  const [errorMessages, setErrorMessages] = useState(null);

  const handleChange = (e) => {
    setErrorMessages(null);
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const { shippingAddress, specialInstruction } = formData;

  const handlePayment = async (e) => {
    e.preventDefault();

    const { error } = newOrderValidatorSchema.validate(formData);

    if (error) {
      setErrorMessages({
        [error?.details[0]?.path[0]]: error?.message,
      });
      return;
    }

    localStorage.setItem(
      'orderCreds',
      JSON.stringify({ ...formData, orderValue: amount })
    );

    makePayment({
      amount,
      shippingAddress,
      customerEamil: user.email,
      customerPhone: user.phone,
      customerName: user.fullName,
    });
  };

  return (
    <div>
      <form onSubmit={handlePayment} className="new-order-from">
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
            handleClick={() => setView(<OrderCart />)}
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

export default NewOrderForm;
