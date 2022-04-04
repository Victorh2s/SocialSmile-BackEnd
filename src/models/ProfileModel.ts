import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';
import { ProfileAttributes } from '../interfaces/ProfileProtocol';

export class Profile
  extends Model<ProfileAttributes>
  implements ProfileAttributes
{
  id!: number;
  profileId!: number;
  bio!: string;
  name!: string;
  // static associate(models: any) {
  //   User.belongsToMany(models.Project, {
  //     through: 'ProjectAssignments',
  //   });
  // }
}

Profile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    profileId: DataTypes.INTEGER,
    bio: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        len: {
          args: [0, 100],
          msg: 'Your bio must be up to 35 characters',
        },
      },
    },
    name: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        len: {
          args: [0, 16],
          msg: 'Your bio must be up to 10 characters',
        },
      },
    },
  },
  {
    sequelize,
    modelName: 'profile',
  },
);
