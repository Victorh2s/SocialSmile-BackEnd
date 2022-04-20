/* eslint-disable @typescript-eslint/no-explicit-any */
'use strict';
import { DataTypes, Model } from 'sequelize';
import { PostsAttributes } from '../interfaces/PostsProtocol';
import { sequelize } from '../config/db';
import appConfig from '../config/url';

class Posts extends Model<PostsAttributes> implements PostsAttributes {
  declare upostsid: number;
  declare title: string;
  declare description: string;
  declare originalname: string;
  declare filename: string;
  declare url: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Posts.init(
  {
    upostsid: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        len: {
          args: [0, 50],
          msg: 'Your title must be up to 100 characters',
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        len: {
          args: [0, 500],
          msg: 'Your title must be up to 100 characters',
        },
      },
    },
    originalname: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: 'The field cannot be empty',
        },
      },
    },
    filename: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: 'The field cannot be empty',
        },
      },
    },
    url: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${appConfig.url}/images/${this.getDataValue('filename')}`;
      },
    },
  },
  {
    sequelize,
    modelName: 'posts',
  },
);

export default Posts;
