import { DatabaseQueries } from "../database/database.queries";

export default class ChatController {
    
    private _database: DatabaseQueries;
    constructor(database: DatabaseQueries){
        this._database = database;
    }

    async setRoom(req: any, res: any){
        const {first_user, second_user} = req.body;
        console.log(first_user, second_user);
        const resp = this._database.createRoom(first_user, second_user)
        return res.status(200).send({
            "user1": first_user,
            "user2": second_user,
            "result": "success",
        })
    }

    public async getMessages(req: any, res: any){
        const {chat_id} = req.body;
        console.log(chat_id);
        const resp = await this._database.getMessages(chat_id)
        return res.status(200).send({
            "messages":resp,
            "chat_id": chat_id,
            "result": "success",
        })
    }
}
