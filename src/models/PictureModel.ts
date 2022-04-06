import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';
import { PictureAttributes } from '../interfaces/PictureProtocol';
import appConfig from '../config/url';

export class Picture
  extends Model<PictureAttributes>
  implements PictureAttributes
{
  id!: number;
  UpictureId!: number;
  originalname!: string;
  filename!: string;
  url!: string;

  // static associate(models: any) {
  //   User.belongsToMany(models.Project, {
  //     through: 'ProjectAssignments',
  //   });
  // }
}

Picture.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
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
