import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'reference',
    'user',
    'value',
    'period',
    'status',
  ];
  dataSource = new MatTableDataSource<any>([]);

  dataTotalizators: any = [
    {
      name: 'Alugados',
      value: '35',
      color: 'green',
    },
    {
      name: 'Solicitações',
      value: '01',
      color: 'yelow',
    },
    {
      name: 'Recusados',
      value: '10',
      color: 'red',
    },
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
