#!/usr/bin/env node

/**
 * Database Seeding Script
 * Use this to populate the database with initial data
 * 
 * Usage: npm run db:seed
 */

import { connectDB } from './lib/mongodb.ts';

async function seed() {
  try {
    await connectDB();
    console.log('✅ Database connected');
    
    // Add seeding logic here in Phase 2
    // Example: Create sample achievements, lessons, etc.
    
    console.log('✅ Database seeding complete');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seed();
