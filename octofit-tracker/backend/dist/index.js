import express from 'express';
import mongoose from 'mongoose';
import { connectToDatabase, getApiBaseUrl } from './config/database.js';
import { mockData } from './data/mockData.js';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models/index.js';
const port = Number(process.env.PORT) || 8000;
async function fetchCollection(model, fallback) {
    if (model && mongoose.connection.readyState === 1) {
        const documents = await model.find({}).lean();
        if (documents.length > 0) {
            return documents.map((document) => ({
                ...document,
                id: String(document._id ?? document.id ?? crypto.randomUUID()),
            }));
        }
    }
    return fallback;
}
export function createApp() {
    const app = express();
    app.use(express.json());
    app.get('/api/health', (_request, response) => {
        response.json({
            status: 'ok',
            service: 'octofit-tracker-backend',
            apiUrl: getApiBaseUrl(),
        });
    });
    const router = express.Router();
    router.get(['/users', '/users/'], async (_request, response) => {
        const users = await fetchCollection(User, mockData.users);
        response.json(users);
    });
    router.get(['/teams', '/teams/'], async (_request, response) => {
        const teams = await fetchCollection(Team, mockData.teams);
        response.json(teams);
    });
    router.get(['/activities', '/activities/'], async (_request, response) => {
        const activities = await fetchCollection(Activity, mockData.activities);
        response.json(activities);
    });
    router.get(['/leaderboard', '/leaderboard/'], async (_request, response) => {
        const leaderboard = await fetchCollection(LeaderboardEntry, mockData.leaderboard);
        response.json(leaderboard);
    });
    router.get(['/workouts', '/workouts/'], async (_request, response) => {
        const workouts = await fetchCollection(Workout, mockData.workouts);
        response.json(workouts);
    });
    app.use('/api', router);
    return app;
}
const app = createApp();
if (process.env.NODE_ENV !== 'test') {
    connectToDatabase();
    app.listen(port, () => {
        console.log(`OctoFit API listening on port ${port}`);
        console.log(`API base URL: ${getApiBaseUrl()}`);
    });
}
export default app;
