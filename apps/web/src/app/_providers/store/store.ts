import {
  combineReducers,
  configureStore,
  type EnhancedStore,
  type Reducer,
  type UnknownAction,
} from '@reduxjs/toolkit';
import { type UserState, userReducer } from '@/entities/user/store/userSlice';

export interface RootState {
  user: UserState;
}

const rootReducer: Reducer<RootState, UnknownAction> = combineReducers({
  user: userReducer,
});

export type AppStore = EnhancedStore<RootState, UnknownAction>;

export const makeStore = (): AppStore =>
  configureStore({
    reducer: rootReducer,
  });

export const store: AppStore = makeStore();

export type AppDispatch = AppStore['dispatch'];
