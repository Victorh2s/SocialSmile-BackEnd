/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';
import { UserAttributes } from '../interfaces/UserProtocol';

export class User extends Model<UserAttributes> implements UserAttributes {
  username!: string;

  id!: number;
  name!: string;
  email!: string;
  password!: string;
  static Profile: any;
  static Picture: any;
  static Posts: any;
  static associate(models: any) {
    User.hasOne(models.Profile, {
      foreignKey: 'UprofileId',
      constraints: false,
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
    models.Profile.belongsTo(User);

    User.hasMany(models.Posts, {
      foreignKey: 'UpostsId',
      constraints: false,
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
    models.Posts.belongsTo(User);

    User.hasOne(models.Picture, {
      foreignKey: 'UpictureId',
      constraints: false,
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
    models.Picture.belongsTo(User);
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
    timestamps: true,
    modelName: 'user',
  },
);
