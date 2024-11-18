import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000', // URL frontend
    methods: ['GET', 'POST'],
  },
})
export class NotificationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    const partnerId = client.handshake.query.partnerId;
    if (partnerId) {
      client.join(partnerId);
      console.log(`Client ${client.id} joined room: ${partnerId}`);
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  sendNotificationToPartner(partnerId: string, notification: any) {
    console.log(partnerId);
    
    this.server.to(partnerId).emit('notifyPartner', notification);
  }

  @SubscribeMessage('newBooking')
  handleNewBooking(@MessageBody() data: any): void {
    console.log('New booking received:', data);
    // Gửi thông báo đến tất cả các clients (partners)
    this.server.emit('notifyPartner', {
      message: `New booking: ${data.message}`,
      date: new Date(),
    });
  }
}
