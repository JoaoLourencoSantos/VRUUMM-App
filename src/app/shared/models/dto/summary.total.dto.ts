import { RentStateEnum } from './../enum/rent.state.enum';
export class SummaryTotalDTO {
  name: string = '';
  value: number | string = 0;
  color: string = '';

  status: RentStateEnum = RentStateEnum.PENDENTE;

  constructor(
    name: string,
    value: number | string,
    color: string,
    status: RentStateEnum
  ) {
    this.name = name;
    this.value = value;
    this.color = color;
    this.status = status;
  }
}
