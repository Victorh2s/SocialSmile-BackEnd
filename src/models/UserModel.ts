/* eslint-disable @typescript-eslint/no-explicit-any */
'use strict';
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';
import { UserAttributes } from '../interfaces/UserProtocol';
import bcrypt from 'bcrypt';
import Profile from './ProfileModel';
import Posts from './PostModel';
import Picture from './PictureModel';

class User extends Model<UserAttributes> implements UserAttributes {
  declare id: number;
  declare username: string;
  declare email: string;
  declare password: string;
  static Profile: any;
  static Picture: any;
  static Posts: any;

  static associate(models: any) {
    User.hasOne(models.Picture, {
      foreignKey: 'upictureid',
      constraints: true,
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  }
  passwordIsValid(password: string) {
    return bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      defaultValue: '',
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [3, 12],
          msg: 'User name field must be between 3 and 6 characters long',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      defaultValue: '',
      unique: {
        msg: 'Email already exists',
        name: 'Email',
      },
      validate: {
        isEmail: {
          msg: 'Email invalid',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        len: {
          args: [6, 25],
          msg: 'The password must be between 6 and 25 characters long',
        },
      },
    },
  },
  {
    sequelize,
    modelName: 'users',
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSaltSync(10, 'a');
          user.password = bcrypt.hashSync(user.password, salt);
        }
      },
    },
  },
);

User.hasOne(Profile, {
  foreignKey: 'uprofileid',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
});

Profile.belongsTo(User, {
  foreignKey: 'uprofileid',
  constraints: true,
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
});

User.hasMany(Posts, {
  foreignKey: 'upostsid',
  constraints: true,
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
});

Posts.belongsTo(User, {
  foreignKey: 'upostsid',
  constraints: true,
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
});

User.hasOne(Picture, {
  foreignKey: 'upictureid',
  constraints: true,
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
});

Picture.belongsTo(User, {
  foreignKey: 'upictureid',
  constraints: true,
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
});

export default User;
