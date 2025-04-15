import { Pool } from "pg";

const pool = new Pool({
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    host:process.env.POSTGRES_HOST,
    port:Number(process.env.POSTGRES_HOST),
    database:process.env.DB_NAME
}) 

module.exports = pool;