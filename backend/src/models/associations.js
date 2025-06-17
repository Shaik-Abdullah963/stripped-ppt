import { DataTypes, Op } from 'sequelize';
import { sequelize } from '../config/database.js';
import { Slide } from './slide.js';
import { SlideVersion } from './SlideVersion.js';
import { Presentation } from './Presentation.js';

export function initializeAssociations() {
  // Slide <-> Presentation associations
  Slide.belongsTo(Presentation, { foreignKey: 'presentation_id', onDelete: 'CASCADE' });
  Presentation.hasMany(Slide, { foreignKey: 'presentation_id', onDelete: 'CASCADE' });

  // Slide <-> SlideVersion associations
  Slide.hasOne(SlideVersion, { 
    as: 'latestVersion', 
    foreignKey: 'slide_id',
    scope: {
      version_number: { [Op.eq]: sequelize.literal(`(SELECT MAX(version_number) FROM slide_versions sv WHERE sv.slide_id = "Slide".id)`) }
    }
  });

  // Reverse association
  SlideVersion.belongsTo(Slide, { foreignKey: 'slide_id' });
}