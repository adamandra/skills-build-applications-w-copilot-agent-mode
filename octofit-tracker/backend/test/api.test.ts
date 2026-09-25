import assert from 'node:assert/strict';
import test from 'node:test';

import { createApp } from '../src/index.ts';

test('api exposes the required resource routes', async () => {
  const app = createApp();
  const server = app.listen(0);

  const port = (server.address() as { port: number }).port;
  const baseUrl = `http://127.0.0.1:${port}`;

  const responses = await Promise.all([
    fetch(`${baseUrl}/api/users/`),
    fetch(`${baseUrl}/api/teams/`),
    fetch(`${baseUrl}/api/activities/`),
    fetch(`${baseUrl}/api/leaderboard/`),
    fetch(`${baseUrl}/api/workouts/`),
  ]);

  for (const response of responses) {
    assert.equal(response.status, 200);
    const payload = await response.json();
    assert.ok(Array.isArray(payload));
  }

  await new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(undefined);
    });
  });
});
