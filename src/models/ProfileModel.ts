/* eslint-disable @typescript-eslint/no-explicit-any */
'use strict';
import { Model } from 'sequelize';
import { ProfileAttributes } from '../interfaces/ProfileProtocol';

module.exports = (sequelize: any, DataTypes: any) => {
  class Profile extends Model<ProfileAttributes> implements ProfileAttributes {
    declare UprofileId: number;
    declare bio: string;
    declare name: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    // static associate(models: any) {
    //   User.belongsToMany(models.Project, {
    //     through: 'ProjectAssignments',
    //   });
    // }
  }

  Profile.init(
    {
      UprofileId: DataTypes.INTEGER,
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
};
