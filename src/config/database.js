import * as dotenv from 'dotenv';
dotenv.config();

export default {
  /* SQLite */
  dialect: 'mysql',
  storage: './db.mysql',

  /* MySQL / MariaDB */
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,

  timezone: 'America/Sao_Paulo',
  dialectOptions: {
    timezone: 'local',
  },

  /* ALL */
  define: {
    timestamps: true,
  },
};
