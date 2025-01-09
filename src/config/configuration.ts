import { AppConfig } from 'common/interface';
import * as process from 'process';

console.log("Process",process.env.DB_HOST)

export const configuration = (): AppConfig => ({
  port: parseInt(process.env.PORT, 10),
  database: {
    uri: process.env.MYSQL_URI,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    db: process.env.DB_NAME,
  },
});
