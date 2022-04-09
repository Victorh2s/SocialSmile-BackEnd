import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import UserModel from '../models/UserModel';
import ProfileModel from '../models/ProfileModel';
import PostModel from '../models/PostModel';
import PictureModel from '../models/PictureModel';

const models = [UserModel, ProfileModel, PostModel, PictureModel];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach(
  (model) => model.associate && model.associate(connection.models),
);
