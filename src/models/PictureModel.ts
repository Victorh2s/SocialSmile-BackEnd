/* eslint-disable @typescript-eslint/no-explicit-any */
'use strict';
import { DataTypes, Model } from 'sequelize';
import { PictureAttributes } from '../interfaces/PictureProtocol';
import appConfig from '../config/url';
import { sequelize } from '../config/db';

class Picture extends Model<PictureAttributes> implements PictureAttributes {
  declare upictureid: number;
  declare originalname: string;
  declare filename: string;
  declare url: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Picture.init(
  {
    upictureid: {
      allowNull: false,
      type: DataTypes.INTEGER,
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
    modelName: 'pictures',
  },
);

export default Picture;
