import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import dishesReducer from './dishesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dishes: dishesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;