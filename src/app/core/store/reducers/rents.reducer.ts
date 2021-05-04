import { createReducer, on } from '@ngrx/store';
import { SolicitationDTO } from 'src/app/shared/models/dto/solicitation.dto';

import { ClearRents, FindRents } from './../actions/rents.action';

export class RentState {
  rents: SolicitationDTO[] = [];

  constructor(state?: any) {
    this.rents = state;
  }
}

const _rentReducer = createReducer(
  new RentState(),
  on(FindRents, (state, { payload }) => (state = payload)),
  on(ClearRents, (state) => (state = new RentState()))
);

export function RentReducer(state: RentState, action: any) {
  return _rentReducer(state, action);
}
