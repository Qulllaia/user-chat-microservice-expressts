import { WebSocketServer, WebSocket, ServerOptions } from "ws";

export class Connector extends WebSocketServer{
    constructor(options: ServerOptions){
        let clients = Array<WebSocket>();
        super(options);
        console.log(`websocket started on port ${options.port}`)
        this.connect(clients);
    }
    
    private connect(clients: WebSocket[]){
        this.on("connection", (ws) => {
            clients.push(ws);
            
            this.messageEvent(ws, clients)

            this.on("close", () => {
              clients.forEach((client) => {
                client.send(JSON.stringify({ message: "Пользователь отключился" }));
              });
            });
          });
    }

    private messageEvent(ws: WebSocket, clients: WebSocket[]){
        ws.on("message", (message) => {
            message = JSON.parse(message.toString());
        
            console.log(message);
        
            clients.forEach((client) => {
              if (client !== ws) client.send(JSON.stringify(message));
            });
          });
    }

}
