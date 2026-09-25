import mongoose from 'mongoose';

import { connectToDatabase } from '../config/database.js';
import { mockData } from '../data/mockData.js';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  const connected = await connectToDatabase();

  if (!connected) {
    console.log('Skipping seed because MongoDB is unavailable.');
    return;
  }

  try {
    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    await Promise.all([
      User.insertMany(mockData.users),
      Team.insertMany(mockData.teams),
      Activity.insertMany(mockData.activities),
      LeaderboardEntry.insertMany(mockData.leaderboard),
      Workout.insertMany(mockData.workouts),
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
