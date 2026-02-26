import { createSlice, type PayloadAction, type Reducer } from '@reduxjs/toolkit';
import type { UserInfo, UserRole } from '@/entities/user/model/types';

export interface UserState {
  id: number | null;
  familyId: number | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  familyRole: UserRole | null;
}

const initialState: UserState = {
  email: null,
  familyId: null,
  familyRole: null,
  id: null,
  name: null,
  phone: null,
};

const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    clearUser: (state) => {
      state.id = null;
      state.familyId = null;
      state.name = null;
      state.email = null;
      state.phone = null;
      state.familyRole = null;
    },
    setUser: (state, action: PayloadAction<UserInfo>) => {
      state.id = action.payload.id;
      state.familyId = action.payload.familyId;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.familyRole = action.payload.familyRole;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const userReducer: Reducer<UserState> = userSlice.reducer;
