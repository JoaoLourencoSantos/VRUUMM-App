import { createReducer, on } from '@ngrx/store';

import { SummaryTotalDTO } from './../../../shared/models/dto/summary.total.dto';
import { RentStateEnum } from './../../../shared/models/enum/rent.state.enum';
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
        new SummaryTotalDTO(
          'Finalizados',
          '0',
          'green',
          'FINALIZADO' as RentStateEnum
        ),
        new SummaryTotalDTO(
          'Em andamento',
          '0',
          'blue',
          'EM_ANDAMENTO' as RentStateEnum
        ),
        new SummaryTotalDTO(
          'Pendentes',
          '0',
          'orange',
          'PENDENTE' as RentStateEnum
        ),
        new SummaryTotalDTO(
          'Recusados',
          '0',
          'red',
          'REJEITADO' as RentStateEnum
        ),
      ]))
  )
);

export function SummaryReducer(state: SummaryState, action: any) {
  return _summaryReducer(state, action);
}
