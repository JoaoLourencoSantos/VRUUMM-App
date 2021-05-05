import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { SolicitationDTO } from 'src/app/shared/models/dto/solicitation.dto';
import { AuthService } from 'src/app/shared/services/auth.service';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor(private auth: AuthService) {
    if (!auth.isAuthenticated) {
      return;
    }

    if (!this.isConnected()) {
      this.connect();
    }
  }

  private connect(): void {
    console.log(' [*] Init connection with socket');

    this.socket = io(environment.SOCKET_PATH, {
      reconnectionDelayMax: 10000,
      auth: {
        token: this.auth.session,
      },
    });

    this.socket.on('connect', () => {
      console.log(' [*] Client connected - ' + this.socket.id);
    });

    this.socket.on('disconnect', () => {
      console.log(' [*] Client disconnected ');
    });
  }

  public isConnected(): boolean {
    if (!this.socket) return false;

    return this.socket.connected;
  }

  public disconnect() {
    if (!this.socket) return;

    this.socket.close();
    this.socket.disconnect();
  }

  public emit(event: string, value: any): void {
    this.socket.emit(event, value);
  }

  public getMessages(): Observable<SolicitationDTO> {
    return new Observable((observer) => {
      this.socket.on('notify', (data) => {
        console.log(' [*] Receive message from socket');
        observer.next(JSON.parse(JSON.stringify(data)));
      });
    });
  }
}
