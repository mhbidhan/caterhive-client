import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartHidden: true,
  caterer: '439a025550f403936469429',
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
    addItemToCart: (state, action) => {
      const cartItem = action.payload;

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
    },

    removeItemFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );

      if (state.cartItems.length <= 0) state.caterer = '';
    },

    increaseCartItem: (state, action) => {
      state.cartItems = state.cartItems.map((item) =>
        item._id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
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
} = cartSlice.actions;

export default cartSlice.reducer;
