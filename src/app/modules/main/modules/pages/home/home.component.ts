import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RentStateEnum } from 'src/app/shared/models/enum/rent.state.enum';

import { RentState } from './../../../../../core/store/reducers/rents.reducer';
import { SummaryState } from './../../../../../core/store/reducers/summary.reducer';
import { CarDetailsComponent } from './../../../../../shared/components/details/car-details/car-details.component';
import { UserDetailsComponent } from './../../../../../shared/components/details/user-details/user-details.component';
import { SolicitationDTO } from './../../../../../shared/models/dto/solicitation.dto';
import { ToastService } from './../../../../../shared/services/toast.service';
import { RentService } from './../../services/rent.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = [
    'period',
    'value',
    'devolution',
    'status',
    'user',
    'car',
    'actions',
  ];

  stateEnum = RentStateEnum;

  dataSource = new MatTableDataSource<SolicitationDTO>([]);

  dataTotalizators: any[] = [];

  constructor(
    private rentService: RentService,
    public dialog: MatDialog,
    private toastService: ToastService
  ) {
    this.rentService.populate();
  }

  ngOnInit(): void {
    this.populate();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private populate(): void {
    this.populateDataSource();
    this.populateSummary();
  }

  private populateDataSource(): void {
    this.rentService.rentsState.subscribe((result: RentState) => {
      if (!result) return;
      this.dataSource = new MatTableDataSource<SolicitationDTO>(result.rents);
      this.dataSource.paginator = this.paginator;
    });
  }

  private populateSummary(): void {
    this.rentService.summaryState.subscribe((result: SummaryState) => {
      if (!result) return;

      this.dataTotalizators = result.rents;
    });
  }

  public showCarDetails({ carroAlugado }: SolicitationDTO): void {
    this.dialog.open(CarDetailsComponent, {
      data: carroAlugado,
    });
  }

  public showUserDetails({ usuarioLocatario }: SolicitationDTO): void {
    this.dialog.open(UserDetailsComponent, {
      data: usuarioLocatario,
    });
  }

  public enableAction({ situacao }: SolicitationDTO): boolean {
    if (situacao === 'PENDENTE') {
      return true;
    }

    return false;
  }

  public getStatusColor({ situacao }: SolicitationDTO): string {
    if (situacao === ('REJEITADO' as RentStateEnum)) {
      return 'status-red';
    }

    if (situacao === ('EM_ANDAMENTO' as RentStateEnum)) {
      return 'status-blue';
    }

    if (situacao === ('PENDENTE' as RentStateEnum)) {
      return 'status-orange';
    }

    return 'status-green';
  }

  public aprove({ codigo, situacao }: SolicitationDTO) {
    if (situacao !== 'PENDENTE') {
      this.toastService.baseWarnAlertWithMessage(
        'Esta solicitação já foi aprovada!'
      );

      return;
    }

    this.update(codigo, 'EM_ANDAMENTO' as RentStateEnum);
  }

  public reprove({ codigo, situacao }: SolicitationDTO) {
    if (situacao !== 'PENDENTE') {
      return;
    }

    this.update(codigo, 'REJEITADO' as RentStateEnum);
  }

  private update(code: number | string, status: RentStateEnum) {
    this.rentService.update(code, status).subscribe(
      (result) => {
        if (!result) return;

        if (!result.sucesso) {
          this.toastService.baseWarnAlertWithMessage(result.mensagem);
          return;
        }

        this.toastService.successAlert();

        this.populate();
        this.rentService.populate();
      },
      ({ error }) => {
        this.toastService.baseWarnAlertWithMessage(error.mensagem);
      }
    );
  }
}
