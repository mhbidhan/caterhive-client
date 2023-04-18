import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartHidden: true,
  caterer: '439a025550f403936469429',
  cartItems: [
    {
      _id: '643a72e6118bac3190fdea37',
      title: 'Beef & Rice',
      thumbnail:
        'https://res.cloudinary.com/xelta/image/upload/v1681552147/caterhive/qqfjkyvo4nhf5qiwwtme.webp',
      price: 300,
      quantity: 1,
    },
    {
      quantity: 4,
      _id: '643d244651151be1f754aa51',

      caterer: { __v: 0, _id: '6439a025550f403936469429' },
      title: 'Beef & Salad',
      thumbnail:
        'https://res.cloudinary.com/xelta/image/upload/v1681728581/caterhive/ky3t50gvbn1x2ge8ngrq.jpg',
      price: 300,
    },
  ],
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
