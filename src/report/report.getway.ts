import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";

@WebSocketGateway({ cors: true })
export class ReportGetWay{
    @WebSocketServer()
    server;

    @SubscribeMessage('updateReports')
    handleEvent(@MessageBody() data: string) {
      this.server.emit('updateReports', data)
    }
}