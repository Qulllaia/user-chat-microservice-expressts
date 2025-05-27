import { WebSocketServer, WebSocket, ServerOptions } from "ws";
import { WebSocketData } from "./websocket.types";

export class Connector extends WebSocketServer{
    constructor(options: ServerOptions){
        let clients = Array<WebSocketData>();
        super(options);
        console.log(`websocket started on port ${options.port}`)
        this.connect(clients);
    }
    
    private connect(clients: WebSocketData[]){
        this.on("connection", (ws, requset) => {
          const url = requset.url
          if(url){
            let currentClient: WebSocketData = {
              sender_id: Number(this.extractParamValue(url, 'sender_id')),
              getter_id: Number(this.extractParamValue(url, 'getter_id')),
              ws: ws
            };
            clients.push(currentClient);
            this.messageEvent(currentClient, clients)
          }

          this.on("close", () => {
            clients.forEach((client) => {
              client.ws.send(JSON.stringify({ message: "Пользователь отключился" }));
            });
          });
        });
    }

    private messageEvent(currentClient: WebSocketData, clients: WebSocketData[]){
        currentClient.ws.on("message", (message) => {
            message = JSON.parse(message.toString());
                   
            clients.forEach((client) => {
              if (client.ws !== currentClient.ws && 
                client.getter_id === currentClient.sender_id && 
                currentClient.getter_id === client.sender_id) client.ws.send(JSON.stringify(message));
            });
          });
    }

    private extractParamValue(url: string, paramName: string): string | null {
      const regex = new RegExp(`[\\/?&]${paramName}=([^\/&]+)`);
      const match = url.match(regex);
      return match?.[1] ?? null;
    }

}
