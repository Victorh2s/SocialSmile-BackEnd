import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';
import { PostsAttributes } from '../interfaces/PostsProtocol';

export class Posts extends Model<PostsAttributes> implements PostsAttributes {
  id!: number;
  content!: string;
  title!: string;
  // static associate(models: any) {
  //   User.belongsToMany(models.Project, {
  //     through: 'ProjectAssignments',
  //   });
  // }
}

Posts.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        len: {
          args: [0, 350],
          msg: 'Your bio must be up to 350 characters',
        },
      },
    },
    title: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        len: {
          args: [0, 100],
          msg: 'Your title must be up to 100 characters',
        },
      },
    },
  },
  {
    sequelize,
    modelName: 'posts',
  },
);
