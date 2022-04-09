/* eslint-disable @typescript-eslint/no-explicit-any */
'use strict';
import { Model } from 'sequelize';
import { PictureAttributes } from '../interfaces/PictureProtocol';
import appConfig from '../config/url';

module.exports = (sequelize: any, DataTypes: any) => {
  class Picture extends Model<PictureAttributes> implements PictureAttributes {
    declare UpictureId: number;
    declare originalname: string;
    declare filename: string;
    declare url: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // static associate(models: any) {
    //   User.belongsToMany(models.Project, {
    //     through: 'ProjectAssignments',
    //   });
    // }
  }

  Picture.init(
    {
      UpictureId: DataTypes.INTEGER,
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
      modelName: 'pictures',
    },
  );
};
