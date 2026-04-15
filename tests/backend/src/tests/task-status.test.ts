import { test, expect } from '@playwright/test';
import PwHelpers from './pw-helpers';

test('create task status', async ({ request }) => {
  const client = await PwHelpers.createDefaultClient(request);
  const accountant = await PwHelpers.createDefaultAccountant(request);
  const task = await PwHelpers.createDefaultTask(request, client.id, accountant.id);

  const inputData = {
    taskId: task.id,
    taskStatus: 'PENDING'
  };

  const response = await request.post('/task-status', { data: inputData });

  expect(response.status()).toBe(201);

  const body = await response.json();

  expect(body.id).toBeTruthy();
  expect(body.taskId).toBe(inputData.taskId);
  expect(body.taskStatus).toBe(inputData.taskStatus);
});

test('retrieve task status', async ({ request }) => {
  const client = await PwHelpers.createDefaultClient(request);
  const accountant = await PwHelpers.createDefaultAccountant(request);
  const task = await PwHelpers.createDefaultTask(request, client.id, accountant.id);
  const status = await PwHelpers.createDefaultTaskStatus(request, task.id);

  const response = await request.get(`/task-status/${status.id}`);

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.id).toBe(status.id);
});

test('destroy task status', async ({ request }) => {
  const client = await PwHelpers.createDefaultClient(request);
  const accountant = await PwHelpers.createDefaultAccountant(request);
  const task = await PwHelpers.createDefaultTask(request, client.id, accountant.id);
  const status = await PwHelpers.createDefaultTaskStatus(request, task.id);

  const response = await request.delete(`/task-status/${status.id}`);

  expect(response.status()).toBe(204);
});

test('list task statuses', async ({ request }) => {
  const response = await request.get('/task-status');

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.length).toBeGreaterThanOrEqual(0);
});

test('get task statuses by task', async ({ request }) => {
  const client = await PwHelpers.createDefaultClient(request);
  const accountant = await PwHelpers.createDefaultAccountant(request);
  const task = await PwHelpers.createDefaultTask(request, client.id, accountant.id);

  await PwHelpers.createDefaultTaskStatus(request, task.id);

  const response = await request.get(`/task-status/task/${task.id}`);

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.length).toBeGreaterThanOrEqual(1);
});