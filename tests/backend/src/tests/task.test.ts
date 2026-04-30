import { test, expect } from '@playwright/test';
import PwHelpers from './pw-helpers';

test('create task', async ({ request }) => {
  const client = await PwHelpers.createDefaultClient(request);
  const accountant = await PwHelpers.createDefaultAccountant(request);

  const inputData = {
    clientId: client.id,
    accountantId: accountant.id,
    title: 'Test Task',
    description: 'This is a test task',
    taskStatus: 'In Progress'
  };

  const response = await request.post('tasks', { data: inputData });

  expect(response.status()).toBe(201);

  const body = await response.json();

  expect(body.id).toBeTruthy();
  expect(body.clientId).toBe(inputData.clientId);
  expect(body.accountantId).toBe(inputData.accountantId);
  expect(body.title).toBe(inputData.title);
  expect(body.description).toBe(inputData.description);
  expect(body.taskStatus).toBe(inputData.taskStatus);
});

test('retrieve task', async ({ request }) => {
  const client = await PwHelpers.createDefaultClient(request);
  const accountant = await PwHelpers.createDefaultAccountant(request);

  const task = await PwHelpers.createDefaultTask(request, client.id, accountant.id);

  const response = await request.get(`tasks/${task.id}`);

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.id).toBe(task.id);
});

test('update task status', async ({ request }) => {
  const client = await PwHelpers.createDefaultClient(request);
  const accountant = await PwHelpers.createDefaultAccountant(request);

  const task = await PwHelpers.createDefaultTask(request, client.id, accountant.id);

  const response = await request.put(
    `tasks/${task.id}/status?status=Completed`
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.taskStatus).toBe('Completed');
});

test('destroy task (soft delete)', async ({ request }) => {
  const client = await PwHelpers.createDefaultClient(request);
  const accountant = await PwHelpers.createDefaultAccountant(request);

  const task = await PwHelpers.createDefaultTask(request, client.id, accountant.id);

  const response = await request.delete(`tasks/${task.id}`);

  expect(response.status()).toBe(204);
});

test('list tasks', async ({ request }) => {
  const response = await request.get('tasks');

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.length).toBeGreaterThanOrEqual(0);
});

test('list active tasks', async ({ request }) => {
  const response = await request.get('tasks/active');

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.length).toBeGreaterThanOrEqual(0);
});