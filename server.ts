import bodyParser from "body-parser";
import { Connector } from "./websocket/websocket.connector";
import { DatabaseQueries } from "./database/database.queries";
import MamaRouter from "./routers/chat.router";

const express = require('express')
require('dotenv').config()

const DATABASE = new DatabaseQueries()
const router = new MamaRouter().routerInizializer(
    express.Router(), 
    DATABASE);
    
new Connector({port: 4000}, DATABASE);

const app = express()
const port = 8080
app.use(bodyParser.json())

app.use(router)

app.listen(port, ()=>{
    console.log(`express started on port ${port}`)
})



