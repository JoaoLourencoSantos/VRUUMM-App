import { createAction } from '@ngrx/store';

import { SummaryState } from './../reducers/summary.reducer';

export enum SummaryActionEnum {
  FIND_ALL = '[FIND_ALL] Find summary',
  CLEAR_ALL = '[CLEAR_ALL] Clear all rents',
}

export const FindSummary = createAction(
  SummaryActionEnum.FIND_ALL,
  (payload: SummaryState) => ({
    payload,
  })
);

export const ClearSummary = createAction(SummaryActionEnum.CLEAR_ALL);
