import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Dish } from '../api/types';
import { getDishByName } from '../api/dishes';
import { AxiosError } from 'axios';

interface DishState {
  currentDish: Dish | null;
  loading: boolean;
  error: string | null;
}

const initialState: DishState = {
  currentDish: null,
  loading: false,
  error: null,
};

interface ErrorResponse {
  message?: string;
}

export const fetchDishByName = createAsyncThunk(
  'dishes/fetchByName',
  async (name: string, { rejectWithValue }) => {
    try {
      return await getDishByName(name);
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch dish'
      );
    }
  }
);

const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {
    clearCurrentDish(state) {
      state.currentDish = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishByName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDishByName.fulfilled, (state, action) => {
        state.loading = false;
        state.currentDish = action.payload;
      })
      .addCase(fetchDishByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentDish } = dishesSlice.actions;
export default dishesSlice.reducer;