import { Presentation } from '../models/Presentation.js';
import { Slide } from '../models/Slid.js';
import { SlideVersion } from '../models/SlideVersion.js';

// Sample seed data function
export async function seedDatabase() {
  try {
    // Create demo presentation
    const demo = await Presentation.create({
      title: 'Demo Presentation',
      created_at: new Date(),
      updated_at: new Date()
    });
    
    // Create demo slides
    const slide1 = await Slide.create({
      presentation_id: demo.id,
      created_at: new Date(),
      updated_at: new Date()
    });
    
    // Create demo slide version
    await SlideVersion.create({
      slide_id: slide1.id,
      content: JSON.stringify({ type: 'heading', text: 'Welcome to Demo' }),
      version_number: 1,
      created_at: new Date(),
      updated_at: new Date()
    });
    
    console.log('Demo data seeded successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}