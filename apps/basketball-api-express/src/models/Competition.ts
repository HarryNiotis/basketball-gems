import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';

export class Competition extends Model {}

Competition.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.STRING,
    },
    Code: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: 'Competitions',
    timestamps: false,
  }
);