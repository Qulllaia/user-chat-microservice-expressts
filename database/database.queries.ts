import { pool } from "../database/databse.config";
export class DatabaseQueries{

    async createRoom(first_user:number, second_user:number){
        const result = await pool().query(`INSERT INTO room(first_user, second_user) VALUES (${first_user}, ${second_user})`);
        return result;
    }

    async getMessages(room_id: number){
        const result = await pool().query(`SELECT id, message FROM "ChatHistory" where chat_id = ${room_id}`)
        return result.rows;
    }
}