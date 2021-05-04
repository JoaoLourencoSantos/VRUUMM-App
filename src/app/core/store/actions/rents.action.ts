import { RentState } from './../reducers/rents.reducer';
import { createAction } from '@ngrx/store';

export enum RentActionEnum {
  FIND_ALL = '[FIND_ALL] Find all rents',
  CLEAR_ALL = '[CLEAR_ALL] Clear all rents',
}

export const FindRents = createAction(
  RentActionEnum.FIND_ALL,
  (payload: RentState) => ({
    payload,
  })
);

export const ClearRents = createAction(
  RentActionEnum.CLEAR_ALL,
  (payload: RentState) => ({
    payload,
  })
);
