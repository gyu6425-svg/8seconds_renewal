import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { AddToCartPayload, CartState } from './cartTypes';

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const recalculateCart = (state: CartState) => {
  state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
  state.totalPrice = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<AddToCartPayload>) {
      const { id, name, price, image, quantity = 1 } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          id,
          name,
          price,
          image,
          quantity,
        });
      }

      recalculateCart(state);
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      recalculateCart(state);
    },
    increaseQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find((cartItem) => cartItem.id === action.payload);

      if (!item) {
        return;
      }

      item.quantity += 1;
      recalculateCart(state);
    },
    decreaseQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find((cartItem) => cartItem.id === action.payload);

      if (!item) {
        return;
      }

      if (item.quantity <= 1) {
        state.items = state.items.filter((cartItem) => cartItem.id !== action.payload);
      } else {
        item.quantity -= 1;
      }

      recalculateCart(state);
    },
    clearCart(state) {
      state.items = initialState.items;
      state.totalQuantity = initialState.totalQuantity;
      state.totalPrice = initialState.totalPrice;
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
