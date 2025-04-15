import { Connector } from "./websocket/websocket.connector";

const express = require('express')

const app = express()
const port = 8080

app.listen(port, ()=>{
    console.log(`express started on port ${port}`)
})

const connector = new Connector({port: 8000});


