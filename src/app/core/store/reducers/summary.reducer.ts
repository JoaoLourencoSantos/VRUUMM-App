import { createReducer, on } from '@ngrx/store';

import { ClearSummary, FindSummary } from './../actions/summary.action';

export class SummaryState {
  rents: any[] = [];

  constructor(state?: any) {
    this.rents = state;
  }
}

const _summaryReducer = createReducer(
  new SummaryState(),
  on(FindSummary, (state, { payload }) => (state = payload)),
  on(ClearSummary, (state) => (state = new SummaryState()))
);

export function SummaryReducer(state: SummaryState, action: any) {
  return _summaryReducer(state, action);
}
