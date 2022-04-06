import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';
import { PostsAttributes } from '../interfaces/PostsProtocol';
import appConfig from '../config/url';

export class Posts extends Model<PostsAttributes> implements PostsAttributes {
  id!: number;
  UpostsId!: number;
  title!: string;
  content!: string;
  filename!: string;
  url!: string;

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
    UpostsId: DataTypes.INTEGER,
    title: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        len: {
          args: [0, 80],
          msg: 'Your title must be up to 100 characters',
        },
      },
    },
    content: {
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
    modelName: 'posts',
  },
);
