import React, { useContext } from 'react';
import { NewOrderContext } from '../../pages/NewOrder/NewOrder.page';
import OrderCart from '../NewOrderCart/NewOrderCart.component';
import CustomButton from './../common/CustomButton/CustomButton.component';
import InputField from './../common/InputField/InputField.component';
import './NewOrderForm.styles.scss';

const NewOrderForm = () => {
  const { formData, setFormData, setView } = useContext(NewOrderContext);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const { shippingAddress, specialInstruction } = formData;

  return (
    <div>
      <form onSubmit={() => setView(<>Payment</>)} className="new-order-from">
        <InputField
          label={'Shipping Address'}
          name={'shippingAddress'}
          value={shippingAddress}
          element="textArea"
          handleChange={handleChange}
        />
        <InputField
          label={'Special Instruction'}
          name={'specialInstruction'}
          value={specialInstruction}
          element="textArea"
          handleChange={handleChange}
        />
        <div className="btn-container">
          <CustomButton
            label={'Back'}
            handleClick={() => setView(<OrderCart />)}
          />
          <CustomButton label={'Payment'} primary={true} />
        </div>
      </form>
    </div>
  );
};

export default NewOrderForm;
