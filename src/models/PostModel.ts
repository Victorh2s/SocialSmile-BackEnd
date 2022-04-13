/* eslint-disable @typescript-eslint/no-explicit-any */
'use strict';
import { DataTypes, Model } from 'sequelize';
import { PostsAttributes } from '../interfaces/PostsProtocol';
import { sequelize } from '../config/db';

class Posts extends Model<PostsAttributes> implements PostsAttributes {
  declare upostsid: number;
  declare title: string;
  declare description: string;
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
  },
  {
    sequelize,
    modelName: 'posts',
  },
);

export default Posts;
