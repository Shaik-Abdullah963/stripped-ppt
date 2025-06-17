// backend/src/models/Slide.js

import { DataTypes } from 'sequelize';  // Remove Op import
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

// REMOVE ALL ASSOCIATIONS AND IMPORTS BELOW THIS LINE