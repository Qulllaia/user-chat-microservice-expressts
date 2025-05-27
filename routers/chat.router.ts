import { IRouter } from "express"
import ChatController from "../controllers/chat.controller"
import { DatabaseQueries } from "../database/database.queries"

export default class MamaRouter{
    public routerInizializer(router: IRouter, database: DatabaseQueries): IRouter{
        const controller = new ChatController(database)
        router.post('/create', (req, res)=> controller.setRoom(req, res))
        router.get('/messages', (req, res)=> controller.getMessages(req, res))

        return router;
    }
}

