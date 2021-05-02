import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RentStateEnum } from 'src/app/shared/models/enum/rent.state.enum';

import { CarDetailsComponent } from './../../../../../shared/components/details/car-details/car-details.component';
import { UserDetailsComponent } from './../../../../../shared/components/details/user-details/user-details.component';
import { SolicitationDTO } from './../../../../../shared/models/dto/solicitation.dto';
import { SummaryDTO } from './../../../../../shared/models/dto/summary.dto';
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

  dataTotalizators: any[] = [
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
      name: 'Solicitações',
      value: '0',
      color: 'orange',
    },
    {
      name: 'Recusados',
      value: '0',
      color: 'red',
    },
  ];

  constructor(
    private rentService: RentService,
    public dialog: MatDialog,
    private toastService: ToastService
  ) {}

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
    this.rentService.find().subscribe((result: SolicitationDTO[]) => {
      if (!result) return;
      this.dataSource = new MatTableDataSource<SolicitationDTO>(result);
    });
  }

  private populateSummary(): void {
    this.rentService.summary().subscribe((result: SummaryDTO) => {
      if (!result) return;

      this.dataTotalizators = [];

      this.dataTotalizators.push(
        this.buildTotalizator(
          'green',
          'Finalizados',
          result.quantidadeDeAlugueisFinalizados
        )
      );
      this.dataTotalizators.push(
        this.buildTotalizator(
          'blue',
          'Em andamento',
          result.quantidadeDeAlugueisEmAndamento
        )
      );
      this.dataTotalizators.push(
        this.buildTotalizator(
          'orange',
          'Pendentes',
          result.quantidadeDeAlugueisPendentes
        )
      );
      this.dataTotalizators.push(
        this.buildTotalizator(
          'red',
          'Recusados',
          result.quantidadeDeAlugueisRejeitados
        )
      );
    });
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
      },
      ({ error }) => {
        this.toastService.baseWarnAlertWithMessage(error.mensagem);
      }
    );
  }
}
