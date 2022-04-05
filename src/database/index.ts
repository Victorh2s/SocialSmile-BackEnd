/* eslint-disable @typescript-eslint/no-explicit-any */
import { sequelize } from '../config/db';

const models: any[] = [];

models.forEach((model) => model.init(sequelize));
models.forEach((model) => model.associate && model.associate(sequelize.models));
