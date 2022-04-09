/* eslint-disable @typescript-eslint/no-explicit-any */
'use strict';
import { Model } from 'sequelize';
import { PostsAttributes } from '../interfaces/PostsProtocol';
import appConfig from '../config/url';

module.exports = (sequelize: any, DataTypes: any) => {
  class Posts extends Model<PostsAttributes> implements PostsAttributes {
    declare UpostsId: number;
    declare title: string;
    declare content: string;
    declare filename: string;
    url!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // static associate(models: any) {
    //   User.belongsToMany(models.Project, {
    //     through: 'ProjectAssignments',
    //   });
    // }
  }

  Posts.init(
    {
      UpostsId: DataTypes.INTEGER,
      title: {
        type: DataTypes.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [0, 80],
            msg: 'Your title must be up to 100 characters',
          },
        },
      },
      content: {
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
};
