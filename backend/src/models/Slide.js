// backend/src/models/Slide.js

import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';  

export const Slide = sequelize.define(
  'Slide',
  {
    current_version_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null
    }
  },
  {
    tableName:   'slides',
    timestamps:  true,
    underscored: true
  }
);

// associations
import { Presentation } from './Presentation.js';
Slide.belongsTo(Presentation, { foreignKey: 'presentation_id', onDelete: 'CASCADE' });
Presentation.hasMany(Slide,    { foreignKey: 'presentation_id', onDelete: 'CASCADE' });
