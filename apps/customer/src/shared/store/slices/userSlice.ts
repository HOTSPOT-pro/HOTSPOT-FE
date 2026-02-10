import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  userId: number | null;
  accessToken: string | null;
}

const initialState: UserState = {
  userId: null,
  accessToken: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<UserState>) => {
      state.userId = action.payload.userId;
      state.accessToken = action.payload.accessToken;
    },
    clearAuth: (state) => {
      state.userId = null;
      state.accessToken = null;
    },
  },
});

// actions와 reducer 선언
export const { setAuth, clearAuth } = userSlice.actions;
export const userReducer = userSlice.reducer;
