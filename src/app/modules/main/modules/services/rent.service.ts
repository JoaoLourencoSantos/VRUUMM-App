import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SolicitationDTO } from 'src/app/shared/models/dto/solicitation.dto';
import { RentStateEnum } from 'src/app/shared/models/enum/rent.state.enum';

import { environment } from './../../../../../environments/environment';
import {
  ClearRents,
  FindRents,
} from './../../../../core/store/actions/rents.action';
import {
  ClearSummary,
  FindSummary,
} from './../../../../core/store/actions/summary.action';
import { RentState } from './../../../../core/store/reducers/rents.reducer';
import { SummaryState } from './../../../../core/store/reducers/summary.reducer';
import { ResponseDTO } from './../../../../shared/models/dto/response.dto';
import { SummaryDTO } from './../../../../shared/models/dto/summary.dto';
import { SummaryTotalDTO } from './../../../../shared/models/dto/summary.total.dto';
import { AuthService } from './../../../../shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RentService {
  private API_BASEPATH = environment.API_BASEPATH;

  private rentsState$: Observable<RentState>;
  private summaryState$: Observable<SummaryState>;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private store: Store<any>
  ) {
    this.rentsState$ = this.store.pipe(select('rents'));
    this.summaryState$ = this.store.pipe(select('summary'));

    this.populate();
  }

  public get rentsState() {
    return this.rentsState$;
  }

  public get summaryState() {
    return this.summaryState$;
  }

  public clear() {
    this.store.dispatch(ClearRents());
    this.store.dispatch(ClearSummary());
  }

  public populate() {
    this.find().subscribe((result: SolicitationDTO[]) => {
      this.store.dispatch(FindRents(new RentState(result)));
    });

    this.summary().subscribe((result: SummaryDTO) => {
      if (!result) return;

      this.store.dispatch(
        FindSummary(new SummaryState(this.buildList(result)))
      );
    });
  }

  public populateListWithFilter(status?: RentStateEnum) {
    this.find(status).subscribe((result: SolicitationDTO[]) => {
      this.store.dispatch(FindRents(new RentState(result)));
    });
  }

  find(status?: RentStateEnum): Observable<SolicitationDTO[]> {
    return this.http
      .get<ResponseDTO>(
        `${this.API_BASEPATH}/alugueis?codigoUsuarioLocador=${
          this.auth.session
        }&situacao=${status || ''}`,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .pipe(map((result: ResponseDTO) => result.corpo));
  }

  summary(): Observable<SummaryDTO> {
    return this.http
      .get<ResponseDTO>(
        `${this.API_BASEPATH}/alugueis/resumo/${this.auth.session}`,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .pipe(map((result: ResponseDTO) => result.corpo));
  }

  update(
    code: number | string,
    state: RentStateEnum,
    date?: string
  ): Observable<ResponseDTO> {
    let body: any = {
      situacao: state,
    };

    if (date) {
      body = {
        ...body,
        dataDeDevolucaoDoCarro: date,
      };
    }

    console.log(body);

    return this.http.patch<ResponseDTO>(
      `${this.API_BASEPATH}/alugueis/${code}`,
      body,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  private buildList(data: SummaryDTO): SummaryTotalDTO[] {
    let dataTotalizators = [];

    dataTotalizators.push(
      new SummaryTotalDTO(
        'Finalizados',
        data.quantidadeDeAlugueisFinalizados,
        'green',
        'FINALIZADO' as RentStateEnum
      )
    );

    dataTotalizators.push(
      new SummaryTotalDTO(
        'Em andamento',
        data.quantidadeDeAlugueisEmAndamento,
        'blue',
        'EM_ANDAMENTO' as RentStateEnum
      )
    );

    dataTotalizators.push(
      new SummaryTotalDTO(
        'Pendentes',
        data.quantidadeDeAlugueisPendentes,
        'orange',
        'PENDENTE' as RentStateEnum
      )
    );

    dataTotalizators.push(
      new SummaryTotalDTO(
        'Recusados',
        data.quantidadeDeAlugueisRejeitados,
        'red',
        'REJEITADO' as RentStateEnum
      )
    );

    return dataTotalizators;
  }
}
