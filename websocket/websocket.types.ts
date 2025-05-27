import { WebSocket } from "ws";

export interface WebSocketData{
    sender_id: number,
    getter_id: number,
    ws: WebSocket
}