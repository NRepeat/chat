import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

type MessageType = {
  message: string;
  user: UserType;
};

export type UserType = {
  username: string;
  id: string;
};

@WebSocketGateway(3003, {
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    this.server.emit('user-joined', client.id);
    console.log('🚀 ~ ChatGateway ~ client:', client.id);
  }
  handleDisconnect(client: Socket) {
    console.log('🚀 ~ ChatGateway ~ clientasdasd:', client.id);
  }
  @SubscribeMessage('newMessage')
  handleNewMessage(client: Socket, @MessageBody() message: MessageType) {
    console.log('asdasd', message);
    this.server.emit('reply', message);
  }
}
