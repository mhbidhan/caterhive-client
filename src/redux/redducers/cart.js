import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

const initialState = {
  cartHidden: true,
  caterer: '',
  cartItems: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart: (state, action) => {
      state.cartHidden = !state.cartHidden;
    },

    setCartHidden: (state, action) => {
      state.cartHidden = true;
    },

    setCartData: (state, action) => {
      const { cartItems, caterer } = action.payload;
      state.cartItems = cartItems;
      state.caterer = caterer;
    },

    addItemToCart: (state, action) => {
      const cartItem = action.payload;

      const today = moment(new Date()).format('dddd').toLowerCase();
      if (cartItem.day !== today)
        return alert('This menu is not available today');

      const caterer = cartItem.caterer?._id || cartItem.caterer;

      if (state.caterer && state.caterer !== caterer)
        return alert('Can not add menus from multiple caterer');

      if (!state.caterer) state.caterer = caterer;

      const exists = state.cartItems.find((item) => item._id === cartItem._id);

      if (!exists) {
        state.cartItems = [...state.cartItems, { ...cartItem, quantity: 1 }];
      } else {
        state.cartItems = state.cartItems.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      persistCartData(state);
    },

    removeItemFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );

      if (state.cartItems.length <= 0) state.caterer = '';
      persistCartData(state);
    },

    increaseCartItem: (state, action) => {
      state.cartItems = state.cartItems.map((item) =>
        item._id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      persistCartData(state);
    },

    decreaseCartItem: (state, action) => {
      const cartItem = state.cartItems.find(
        (item) => item._id === action.payload
      );

      if (cartItem.quantity > 1) {
        state.cartItems = state.cartItems.map((item) =>
          item._id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== action.payload
        );

      if (state.cartItems.length <= 0) state.caterer = '';
      persistCartData(state);
    },
  },
});

export const {
  toggleCart,
  setCartHidden,
  addItemToCart,
  removeItemFromCart,
  increaseCartItem,
  decreaseCartItem,
  setCartData,
} = cartSlice.actions;

export default cartSlice.reducer;

function persistCartData(state) {
  const { cartItems, caterer } = state;
  localStorage.setItem('cartData', JSON.stringify({ cartItems, caterer }));
}
