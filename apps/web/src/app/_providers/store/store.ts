import {
  combineReducers,
  configureStore,
  type EnhancedStore,
  type Reducer,
  type UnknownAction,
} from '@reduxjs/toolkit';
import {
  createTransform,
  FLUSH,
  PAUSE,
  PERSIST,
  type PersistConfig,
  type Persistor,
  type PersistState,
  PURGE,
  persistReducer,
  persistStore,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import { type UserState, userReducer } from '@/entities/user/store/userSlice';

const rootReducer = combineReducers({
  user: userReducer,
});

type ReducerState = ReturnType<typeof rootReducer>;
type PersistedState = ReducerState & { _persist: PersistState };

const userTransform = createTransform<
  UserState,
  Pick<UserState, 'id' | 'familyRole'>,
  ReducerState
>(
  (inboundState) => ({
    familyRole: inboundState.familyRole,
    id: inboundState.id,
  }),
  (outboundState, key) => {
    if (key !== 'user') return outboundState as UserState;

    return {
      email: null,
      familyId: null,
      familyRole: outboundState.familyRole ?? null,
      id: outboundState.id ?? null,
      name: null,
      phone: null,
    } as UserState;
  },
  { whitelist: ['user'] },
);

const persistConfig: PersistConfig<ReducerState> = {
  key: 'root',
  storage: storageSession,
  transforms: [userTransform],
  whitelist: ['user'],
};

const persistedReducer: Reducer<PersistedState, UnknownAction> = persistReducer<
  ReducerState,
  UnknownAction
>(persistConfig, rootReducer);

export type RootState = PersistedState;
export type AppStore = EnhancedStore<RootState, UnknownAction>;
export type AppDispatch = AppStore['dispatch'];

export const makeStore = (): AppStore =>
  configureStore({
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    reducer: persistedReducer,
  }) as AppStore;

export const store: AppStore = makeStore();
export const persistor: Persistor = persistStore(store);
