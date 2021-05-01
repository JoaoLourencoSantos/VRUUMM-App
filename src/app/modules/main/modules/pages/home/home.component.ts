import { UserDetailsComponent } from './../../../../../shared/components/details/user-details/user-details.component';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RentStateEnum } from 'src/app/shared/models/enum/rent.state.enum';

import { CarDetailsComponent } from './../../../../../shared/components/details/car-details/car-details.component';
import { SolicitationDTO } from './../../../../../shared/models/dto/solicitation.dto';
import { SummaryDTO } from './../../../../../shared/models/dto/summary.dto';
import { RentService } from './../../services/rent.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = [
    'key',
    'value',
    'period',
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
      color: 'yelow',
    },
    {
      name: 'Recusados',
      value: '0',
      color: 'red',
    },
  ];

  constructor(private rentService: RentService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.populate();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private populate(): void {
    this.rentService.find().subscribe((result: SolicitationDTO[]) => {
      if (!result) return;
      this.dataSource = new MatTableDataSource<SolicitationDTO>(result);
    });

    this.populateSummary();
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
          'yelow',
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
}
