import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { io } from 'socket.io-client';

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

    this.socket = io('http://localhost:8080', {
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

  public getMessages(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('notify', (data) => {
        console.log(' [*] Receive message from socket - ' + data);
        observer.next(data);
      });
    });
  }
}
