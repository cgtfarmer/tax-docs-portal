import { test, expect } from '@playwright/test';
import PwHelpers from './pw-helpers';

test('create client', async ({ request }) => {
  const inputData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    username: 'johndoe',
    passwordHash: 'hashed-password-123'
  };

  const response = await request.post('/clients', { data: inputData });

  expect(response.status()).toBe(201);

  const body = await response.json();

  expect(body.id).toBeTruthy();
  expect(body.id.length).toBeGreaterThan(0);
  expect(body.firstName).toBe(inputData.firstName);
  expect(body.lastName).toBe(inputData.lastName);
  expect(body.email).toBe(inputData.email);
  expect(body.username).toBe(inputData.username);
  expect(body.passwordHash).toBe(inputData.passwordHash);
});

test('retrieve client', async ({ request }) => {
  const createClientBody = await PwHelpers.createDefaultClient(request);
  const newClientId = createClientBody.id;

  const response = await request.get(`/clients/${newClientId}`);

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.id).toBeTruthy();
  expect(body.id).toBe(newClientId);
});

test('update client', async ({ request }) => {
  const createClientBody = await PwHelpers.createDefaultClient(request);

  const inputData = {
    id: createClientBody.id,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    username: 'janesmith',
    passwordHash: 'updated-hashed-password-456'
  };

  const response = await request.put(`/clients/${inputData.id}`, { data: inputData });

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.id).toBeTruthy();
  expect(body.id).toBe(inputData.id);
  expect(body.firstName).toBe(inputData.firstName);
  expect(body.lastName).toBe(inputData.lastName);
  expect(body.email).toBe(inputData.email);
  expect(body.username).toBe(inputData.username);
  expect(body.passwordHash).toBe(inputData.passwordHash);
});

test('destroy client', async ({ request }) => {
  const createClientBody = await PwHelpers.createDefaultClient(request);
  const newClientId = createClientBody.id;

  const response = await request.delete(`/clients/${newClientId}`);

  expect(response.status()).toBe(204);
});

test('list clients', async ({ request }) => {
  const response = await request.get('/clients');

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.length).toBeGreaterThanOrEqual(0);
});