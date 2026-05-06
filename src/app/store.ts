import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import cartReducer, { CART_STORAGE_KEY } from '../features/cart/cartSlice';
import productReducer from '../features/products/productSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productReducer,
  },
});

// 카트 상태가 실제로 바뀐 경우에만 localStorage에 저장
let previousCart = store.getState().cart;
store.subscribe(() => {
  const currentCart = store.getState().cart;
  if (currentCart !== previousCart) {
    previousCart = currentCart;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(currentCart));
    } catch {
      // localStorage 용량 초과 등의 예외 무시
    }
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
