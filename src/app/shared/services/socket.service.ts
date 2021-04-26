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

  connect() {
    console.log('AQUi');
    this.socket = io('http://localhost:8080', {
      reconnectionDelayMax: 10000,
      auth: {
        token: '123',
      },
      query: {
        'my-key': 'my-value',
      },
    });

    this.socket.on('connect', () => {
      console.log('AQUI');
      console.log(this.socket.id);
      console.log(this.socket.connected);
    });

    this.socket.on('disconnect', () => {
      console.log('DISCONNECT');
    });
  }

  emit() {
    this.socket.emit('new-message', 'message');
  }

  getMessages(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('notify', (data) => {
        console.log('Received message from Websocket Server');
        observer.next(data);
      });
    });
  }
}
