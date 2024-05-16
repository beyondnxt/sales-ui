import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private webSocket!: Socket;
  constructor() { 
    this.connectSocket();
  }

  connectSocket() {
    const authToken = localStorage.getItem('authToken');

    // Use the nullish coalescing operator to provide a default value if authToken is null
    const authorizationHeader = authToken ?? 'empty';
    this.webSocket = io('http://localhost:8080', {
      auth: {
        token: 'test',
      },
      extraHeaders: {
        Authorization: authorizationHeader,
      },
    });
  }

  pendingApprovalNotification(): Observable<any> {
    return new Observable((observable) => {
      this.webSocket.emit('admin_notification', 'Connect');
      this.webSocket.on('admin_notification', (data: any) => {
        observable.next(data);
        console.log('websocket------', data);
      });
    });
  }
  
  disconnectSocket() {
    this.webSocket.disconnect();
  }
  
}
