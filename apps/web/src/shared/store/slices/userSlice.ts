import { createSlice, type PayloadAction, type Reducer } from '@reduxjs/toolkit';

export interface UserState {
  userId: number | null;
  userName: string | null;
  accessToken: string | null;
}

const initialState: UserState = {
  accessToken: null,
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
      state.accessToken = null;
    },
    setAuth: (state, action: PayloadAction<UserState>) => {
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
      state.accessToken = action.payload.accessToken;
    },
  },
});

// actions와 reducer 선언
export const { setAuth, clearAuth } = userSlice.actions;
export const userReducer: Reducer<UserState> = userSlice.reducer;
