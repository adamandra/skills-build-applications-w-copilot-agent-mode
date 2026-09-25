import mongoose from 'mongoose';

export const DATABASE_NAME = 'octofit_db';
export const DEFAULT_MONGODB_URI = `mongodb://localhost:27017/${DATABASE_NAME}`;

export function getApiBaseUrl(): string {
  const codespaceName = process.env.CODESPACE_NAME;

  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
}

export async function connectToDatabase() {
  const connectionString = process.env.MONGODB_URI || DEFAULT_MONGODB_URI;

  try {
    await mongoose.connect(connectionString);
    console.log(`Connected to ${DATABASE_NAME}`);
    return true;
  } catch (error) {
    console.warn(
      `MongoDB unavailable at ${connectionString}. Continuing with in-memory fallback data.`,
      error,
    );
    return false;
  }
}

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

export default mongoose.connection;
