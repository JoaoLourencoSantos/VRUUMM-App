import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SolicitationDTO } from 'src/app/shared/models/dto/solicitation.dto';
import { RentStateEnum } from 'src/app/shared/models/enum/rent.state.enum';

import { environment } from './../../../../../environments/environment';
import { ClearRents, FindRents } from './../../../../core/store/actions/rents.action';
import { ClearSummary, FindSummary } from './../../../../core/store/actions/summary.action';
import { RentState } from './../../../../core/store/reducers/rents.reducer';
import { SummaryState } from './../../../../core/store/reducers/summary.reducer';
import { ResponseDTO } from './../../../../shared/models/dto/response.dto';
import { SummaryDTO } from './../../../../shared/models/dto/summary.dto';
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

      let dataTotalizators = [];

      dataTotalizators.push(
        this.buildTotalizator(
          'green',
          'Finalizados',
          result.quantidadeDeAlugueisFinalizados
        )
      );
      dataTotalizators.push(
        this.buildTotalizator(
          'blue',
          'Em andamento',
          result.quantidadeDeAlugueisEmAndamento
        )
      );
      dataTotalizators.push(
        this.buildTotalizator(
          'orange',
          'Pendentes',
          result.quantidadeDeAlugueisPendentes
        )
      );
      dataTotalizators.push(
        this.buildTotalizator(
          'red',
          'Recusados',
          result.quantidadeDeAlugueisRejeitados
        )
      );

      this.store.dispatch(FindSummary(new SummaryState(dataTotalizators)));
    });
  }

  find(): Observable<SolicitationDTO[]> {
    return this.http
      .get<ResponseDTO>(
        `${this.API_BASEPATH}/alugueis?codigoUsuarioLocador=${this.auth.session}`,
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

  update(code: number | string, state: RentStateEnum): Observable<ResponseDTO> {
    return this.http.patch<ResponseDTO>(
      `${this.API_BASEPATH}/alugueis/${code}`,
      {
        situacao: state,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  private buildTotalizator(
    color: string,
    name: string,
    value: number | string
  ): any {
    return {
      name: name,
      value: value,
      color: color,
    };
  }
}
