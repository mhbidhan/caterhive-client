import React, { createContext, useEffect, useState } from 'react';
import OrderCart from '../../components/NewOrderCart/NewOrderCart.component';
import SidebarButton from './../../components/SidebarButton/SidebarButton.component';
import './NewOrder.styles.scss';

export const NewOrderContext = createContext();

const NewOrder = () => {
  const [view, setView] = useState(null);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    setView(<OrderCart setView={setView} />);
  }, []);

  const [formData, setFormData] = useState({
    orderedProducts: [],
    shippingAddress: '',
    specialInstruction: '',
  });

  return (
    <div className="new-order container">
      <SidebarButton />
      <div className="padding-top">
        <NewOrderContext.Provider
          value={{ setView, formData, setFormData, amount, setAmount }}
        >
          {view}
        </NewOrderContext.Provider>
      </div>
    </div>
  );
};

export default NewOrder;
