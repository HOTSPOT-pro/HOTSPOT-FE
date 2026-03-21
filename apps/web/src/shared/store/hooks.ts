import type { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = (): Dispatch<UnknownAction> => useDispatch<Dispatch<UnknownAction>>();

export const useAppSelector = <TState, TSelected>(
  selector: (state: TState) => TSelected,
): TSelected => useSelector(selector as unknown as (state: unknown) => TSelected);
