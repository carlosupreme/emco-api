import { config } from "dotenv";
import { PoolOptions } from "mysql2/promise";

config();

const credentials = (): PoolOptions => {
  return {
    host: `${process.env.DB_HOST}` || "127.0.0.1",
    user: `${process.env.DB_USER}` || "root",
    password: `${process.env.DB_PASSWORD}` || "password",
    database: `${process.env.DB_DATABASE}` || "emco",
    port: parseInt(`${process.env.DB_PORT}`) || 3306,
  };
};

export default credentials;
