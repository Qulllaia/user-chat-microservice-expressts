import { pool } from "../database/databse.config";
import type { MessageQueryResult, RoomQueryResult } from "./database.types";
export class DatabaseQueries{

    async createRoom(first_user:number, second_user:number): Promise<RoomQueryResult[]> {
        const paramUsersRoom = await this.getRoom(first_user, second_user);
        if(paramUsersRoom.length === 0){
           const result = await pool().query(`INSERT INTO room(first_user, second_user) VALUES (${first_user}, ${second_user}) RETURNING *`);
           return result.rows;
        }
        return paramUsersRoom;
    }

    async getRoom(first_user:number, second_user:number): Promise<RoomQueryResult[]> {
        const result = await pool().query(
            `SELECT id FROM room `+
            `where first_user= ${first_user} AND second_user = ${second_user} OR `+
            `first_user= ${second_user} AND second_user = ${first_user}`)
        return result.rows;
    }

    async getMessages(room_id: number): Promise<MessageQueryResult[]>{
        const result = await pool().query(`SELECT id, message FROM "ChatHistory" where chat_id = ${room_id}`)
        return result.rows;
    }

    async createMessage(message: string, sender_id: number, getter_id: number): Promise<MessageQueryResult[]>{
        const rows = await this.createRoom(sender_id, getter_id);
        const chat_id = rows[0].id
        const result = await pool().query(
            `INSERT INTO "ChatHistory" (message, chat_id, user_id, "timestamp") `+
            `VALUES ('${message}', ${chat_id}, ${sender_id}, '${new Date(Date.now()).toISOString()}') RETURNING *`)
        return result.rows;
    }
}