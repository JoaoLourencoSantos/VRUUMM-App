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
  on(
    ClearSummary,
    (state) =>
      (state = new SummaryState([
        {
          name: 'Finalizados',
          value: '0',
          color: 'green',
        },
        {
          name: 'Em andamento',
          value: '0',
          color: 'blue',
        },
        {
          name: 'Pendentes',
          value: '0',
          color: 'orange',
        },
        {
          name: 'Recusados',
          value: '0',
          color: 'red',
        },
      ]))
  )
);

export function SummaryReducer(state: SummaryState, action: any) {
  return _summaryReducer(state, action);
}
