/** biome-ignore-all lint/correctness/noProcessGlobal: <explanation> */
import type { UserInfo } from '@/entities/user/model/types';
import type { UserState } from '@/entities/user/store/userSlice';
import { clearUser, setUser } from '@/entities/user/store/userSlice';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';

export const useUserStore = (): UserState & {
  setUser: (user: UserInfo) => void;
  clearUser: () => void;
} => {
  const dispatch = useAppDispatch();
  const user = useAppSelector<{ user: UserState }, UserState>((state) => state.user);

  return {
    ...user,
    clearUser: () => {
      if (process.env.NODE_ENV !== 'production') {
        console.debug('[userStore] clearUser dispatched');
      }
      dispatch(clearUser());
    },
    setUser: (user) => {
      if (process.env.NODE_ENV !== 'production') {
        console.debug('[userStore] setUser payload', user);
      }
      dispatch(setUser(user));
    },
  };
};
