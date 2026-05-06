import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { AddToCartPayload, CartState } from './cartTypes';

export const CART_STORAGE_KEY = 'cart';

const emptyState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

function loadCartFromStorage(): CartState {
  try {
    const serialized = localStorage.getItem(CART_STORAGE_KEY);
    if (!serialized) return emptyState;
    const parsed = JSON.parse(serialized) as CartState;
    // items 기반으로 합계 재계산하여 stale 값 방지
    return {
      items: parsed.items ?? [],
      totalQuantity: parsed.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0,
      totalPrice: parsed.items?.reduce((sum, item) => sum + item.price * item.quantity, 0) ?? 0,
    };
  } catch {
    return emptyState;
  }
}

const recalculateCart = (state: CartState) => {
  state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
  state.totalPrice = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartFromStorage,
  reducers: {
    addToCart(state, action: PayloadAction<AddToCartPayload>) {
      const { id, productId, name, price, image, size, quantity = 1 } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          id,
          productId,
          name,
          price,
          image,
          size,
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
      state.items = emptyState.items;
      state.totalQuantity = emptyState.totalQuantity;
      state.totalPrice = emptyState.totalPrice;
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
