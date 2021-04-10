import { EditCarComponent } from './../edit/edit.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListCarComponent implements OnInit {
  cars: any[] = [
    {
      image:
        'https://cdn-motorshow-ssl.akamaized.net/wp-content/uploads/sites/2/2019/11/novo-onix-premier-20.jpg',
    },
    {
      image:
        'https://cdn-motorshow-ssl.akamaized.net/wp-content/uploads/sites/2/2019/11/novo-onix-premier-20.jpg',
    },
    {},
    {
      image:
        'https://cdn-motorshow-ssl.akamaized.net/wp-content/uploads/sites/2/2019/11/novo-onix-premier-20.jpg',
    },
    {},
    {},
  ];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  public  getImage(image: string) : string {
    return image || '../../../../../../../assets/images/default-car.png';
  }

  public openEdit() : void {
    this.dialog.open(EditCarComponent, {
      data: {
        animal: 'panda'
      }
    });
  }
}
