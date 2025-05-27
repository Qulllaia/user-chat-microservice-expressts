// const Pool = require('pg').Pool

import { Pool } from "pg";

export const pool = () =>
    new Pool({
    user:String(process.env.DB_USER),
    password:String(process.env.DB_PASSWORD),
    host:String(process.env.DB_HOST),
    port:Number(process.env.DB_PORT),
    database:String(process.env.DB_NAME)
})


