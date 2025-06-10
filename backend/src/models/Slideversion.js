import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { Slide } from './slide.js';

export const SlideVersion = sequelize.define(
  'SlideVersion',
  {
    version_number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    slide_order: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    layout_type: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    markdown_content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    tableName:   'slide_versions',
    timestamps:  true,
    underscored: true,
    indexes: [
      { unique: true, fields: ['slide_id', 'version_number'] }
    ]
  }
);

SlideVersion.belongsTo(Slide, { foreignKey: 'slide_id', onDelete: 'CASCADE' });
Slide.hasMany(SlideVersion,    { foreignKey: 'slide_id', onDelete: 'CASCADE' });
