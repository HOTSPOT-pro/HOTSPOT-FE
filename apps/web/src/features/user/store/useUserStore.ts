import type { UserAuth } from '@entities/user/model/type';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuth, setAuth } from '@/shared/store/slices/userSlice';
import type { RootState } from '@/shared/store/store';

export const useUserStore = (): UserAuth & {
  setAuth: (auth: UserAuth) => void;
  clearAuth: () => void;
} => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.user);

  return {
    ...auth,
    setAuth: (auth) => dispatch(setAuth(auth)),
    clearAuth: () => dispatch(clearAuth()),
  };
};
