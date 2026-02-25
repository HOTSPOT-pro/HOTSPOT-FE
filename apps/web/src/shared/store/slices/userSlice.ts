import { createSlice, type PayloadAction, type Reducer } from '@reduxjs/toolkit';

export interface UserState {
  userId: number | null;
  userName: string | null;
}

const initialState: UserState = {
  userId: null,
  userName: null,
};

const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    clearAuth: (state) => {
      state.userId = null;
      state.userName = null;
    },
    setAuth: (state, action: PayloadAction<UserState>) => {
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
    },
  },
});

// actions와 reducer 선언
export const { setAuth, clearAuth } = userSlice.actions;
export const userReducer: Reducer<UserState> = userSlice.reducer;
