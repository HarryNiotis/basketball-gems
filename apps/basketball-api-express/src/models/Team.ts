import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';

export class Team extends Model {}

Team.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.STRING,
      unique: true,
    },
    Code: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: 'Teams',
    timestamps: false,
  }
);