import { SolicitationDTO } from 'src/app/shared/models/dto/solicitation.dto';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { io } from 'socket.io-client';
import { ConsumerService } from './consumer.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: any;

  constructor() {
    this.connect();
  }

  private connect(): void {
    console.log(' [*] Init connection with socket');

    this.socket = io(environment.SOCKET_PATH, {
      reconnectionDelayMax: 10000,
      auth: {
        token: '123',
      },
    });

    this.socket.on('connect', () => {
      console.log(' [*] Client connected - ' + this.socket.id);
    });

    this.socket.on('disconnect', () => {
      console.log(' [*] Client disconnected ');
    });
  }

  public emit(event: string, value: any): void {
    this.socket.emit(event, value);
  }

  public getMessages(): Observable<SolicitationDTO> {
    return new Observable((observer) => {
      this.socket.on('notify', (data) => {
        console.log(' [*] Receive message from socket - ' + data);
        observer.next(JSON.parse(JSON.stringify(data)));
      });
    });
  }
}
