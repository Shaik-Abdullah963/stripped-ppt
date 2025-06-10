import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Presentation = sequelize.define(
  'Presentation',
  {
    // id is added automatically as INTEGER PK AUTOINCREMENT
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  },
  {
    tableName:   'presentations',
    timestamps:  true,        // adds created_at & updated_at
    underscored: true         // uses snake_case for those timestamps
  }
);
