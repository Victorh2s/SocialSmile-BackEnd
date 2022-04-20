/* eslint-disable @typescript-eslint/no-explicit-any */
'use strict';
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';
import { ProfileAttributes } from '../interfaces/ProfileProtocol';

class Profile extends Model<ProfileAttributes> implements ProfileAttributes {
  declare uprofileid: number;
  declare bio: string;
  declare name: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  // static associate(models: any) {
  //   this.belongsTo(models.User, {
  //     foreignKey: 'uprofileid',
  //     constraints: true,
  //   });

  // }
}

Profile.init(
  {
    uprofileid: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    bio: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        len: {
          args: [0, 200],
          msg: 'Your bio must be up to 20 characters',
        },
      },
    },
    name: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        len: {
          args: [0, 16],
          msg: 'Your bio must be up to 16 characters',
        },
      },
    },
  },
  {
    sequelize,
    modelName: 'profile',
  },
);

export default Profile;
