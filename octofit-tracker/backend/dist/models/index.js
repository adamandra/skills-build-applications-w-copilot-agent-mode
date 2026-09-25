import mongoose, { Schema } from 'mongoose';
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: Number,
    team: String,
    points: { type: Number, default: 0 },
    level: String,
}, { timestamps: true });
const teamSchema = new Schema({
    name: { type: String, required: true, unique: true },
    memberCount: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    coach: String,
}, { timestamps: true });
const activitySchema = new Schema({
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: Number,
    date: { type: String, required: true },
}, { timestamps: true });
const leaderboardSchema = new Schema({
    name: { type: String, required: true },
    team: String,
    points: { type: Number, required: true },
}, { timestamps: true });
const workoutSchema = new Schema({
    title: { type: String, required: true },
    difficulty: String,
    durationMinutes: Number,
    focus: String,
}, { timestamps: true });
export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);
export const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);
export const LeaderboardEntry = mongoose.models.LeaderboardEntry || mongoose.model('LeaderboardEntry', leaderboardSchema);
export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);
