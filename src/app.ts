/* eslint-disable @typescript-eslint/no-explicit-any */
import dotenv from 'dotenv';
import { resolve } from 'path';
import { AppProtocol } from './interfaces/AppProtocol';

dotenv.config();

// import './src/database';
import express from 'express';
import cors from 'cors';
import delay from 'express-delay-header';
import HomeRoutes from './routes/HomeRoutes';
import UserRoutes from './routes/UserRoutes';

class App implements AppProtocol {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }
  app: any;

  middlewares() {
    this.app.use(delay());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, 'uploads')));
  }

  routes() {
    this.app.use(cors());
    this.app.use('/', HomeRoutes);
    this.app.use('/users', UserRoutes);
  }
}

export default new App().app;
