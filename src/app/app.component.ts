import { map } from 'rxjs/operators';
import { SocketService } from './shared/services/socket.service';
import { Component } from '@angular/core';
import { Subject } from 'rxjs';

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

  constructor(private service: SocketService) {}

  ngOnInit() {
    this.sync();
  }

  sync() {
    this.service.getMessages().subscribe((result: any): any => {
      console.log(result);
    });
  }
}
