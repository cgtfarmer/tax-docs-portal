import { test, expect } from '@playwright/test';

test('healthcheck', async ({ request }) => {
  const response = await request.get('/actuator/info');

  expect(response.ok()).toBeTruthy();
});
