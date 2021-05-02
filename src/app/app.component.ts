import { AproveComponent } from './shared/components/aprove/aprove.component';
import { MatDialog } from '@angular/material/dialog';
import { SolicitationDTO } from 'src/app/shared/models/dto/solicitation.dto';
import { ConsumerService } from './core/socket/consumer.service';
import { Component } from '@angular/core';

import { SocketService } from './core/socket/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Vruumm';
  isAuthenticated: boolean = false;

  newMessage: string;
  messageList: any[] = [];

  constructor(
    private consumer: ConsumerService,
    private service: SocketService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.consume();
    this.sync();
  }

  private sync(): void {
    if (!this.service.isConnected) {
      return;
    }

    this.service.getMessages().subscribe((result: SolicitationDTO): void => {
      console.log(' [*] Result of consume');
      console.log(result);

      this.consumer.add(result);
      this.showAproveModal();
    });
  }

  private consume(): void {
    this.consumer.init();
  }

  public showAproveModal(): void {
    this.dialog.open(AproveComponent);
  }
}
