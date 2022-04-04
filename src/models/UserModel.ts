import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';
import { UserAttributes } from '../interfaces/UserProtocol';

export class User extends Model<UserAttributes> implements UserAttributes {
  username!: string;

  id!: number;
  name!: string;
  email!: string;
  password!: string;
  // static associate(models: any) {
  //   User.belongsToMany(models.Project, {
  //     through: 'ProjectAssignments',
  //   });
  // }
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
          args: [3, 7],
          msg: 'User name field must be between 3 and 6 characters long',
        },
      },
    },
    name: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        len: {
          args: [3, 8],
          msg: 'Name field must have between 3 and 8 characters',
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
    freezeTableName: true,
  },
);
