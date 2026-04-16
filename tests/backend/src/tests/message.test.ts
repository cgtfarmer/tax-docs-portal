import { test, expect } from '@playwright/test';
import PwHelpers from './pw-helpers';

test('create message', async ({ request }) => {
  const client = await PwHelpers.createDefaultClient(request);
  const accountant = await PwHelpers.createDefaultAccountant(request);

  const inputData = {
    clientId: client.id,
    accountantId: accountant.id,
    senderType: 'CLIENT',
    messageText: 'Hello world'
  };

  const response = await request.post('/messages', { data: inputData });

  expect(response.status()).toBe(201);

  const body = await response.json();

  expect(body.id).toBeTruthy();
  expect(body.clientId).toBe(inputData.clientId);
  expect(body.accountantId).toBe(inputData.accountantId);
  expect(body.senderType).toBe(inputData.senderType);
  expect(body.messageText).toBe(inputData.messageText);
});

test('retrieve message', async ({ request }) => {
  const client = await PwHelpers.createDefaultClient(request);
  const accountant = await PwHelpers.createDefaultAccountant(request);
  const message = await PwHelpers.createDefaultMessage(request, client.id, accountant.id);

  const response = await request.get(`/messages/${message.id}`);

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.id).toBe(message.id);
});

test('destroy message', async ({ request }) => {
  const client = await PwHelpers.createDefaultClient(request);
  const accountant = await PwHelpers.createDefaultAccountant(request);
  const message = await PwHelpers.createDefaultMessage(request, client.id, accountant.id);

  const response = await request.delete(`/messages/${message.id}`);

  expect(response.status()).toBe(204);
});

test('list messages', async ({ request }) => {
  const response = await request.get('/messages');

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.length).toBeGreaterThanOrEqual(0);
});

test('get conversation', async ({ request }) => {
  const client = await PwHelpers.createDefaultClient(request);
  const accountant = await PwHelpers.createDefaultAccountant(request);

  await PwHelpers.createDefaultMessage(request, client.id, accountant.id);

  const response = await request.get(
    `/messages/conversation?clientId=${client.id}&accountantId=${accountant.id}`
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.length).toBeGreaterThanOrEqual(1);
});