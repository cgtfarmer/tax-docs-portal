import { test, expect } from '@playwright/test';
import PwHelpers from './pw-helpers';

test('create accountant', async ({ request }) => {
  const inputData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    username: 'johndoe',
    passwordHash: 'hashed-password-123'
  };

  const response = await request.post('accountants', { data: inputData });

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

test('retrieve accountant', async ({ request }) => {
  const createAccountantBody = await PwHelpers.createDefaultAccountant(request);
  const newAccountantId = createAccountantBody.id;

  const response = await request.get(`accountants/${newAccountantId}`);

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.id).toBeTruthy();
  expect(body.id).toBe(newAccountantId);
});

test('update accountant', async ({ request }) => {
  const createAccountantBody = await PwHelpers.createDefaultAccountant(request);

  const inputData = {
    id: createAccountantBody.id,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    username: 'janesmith',
    passwordHash: 'updated-hashed-password-456'
  };

  const response = await request.put(`accountants/${inputData.id}`, { data: inputData });

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

test('destroy accountant', async ({ request }) => {
  const createAccountantBody = await PwHelpers.createDefaultAccountant(request);
  const newAccountantId = createAccountantBody.id;

  const response = await request.delete(`accountants/${newAccountantId}`);

  expect(response.status()).toBe(204);
});

test('list accountants', async ({ request }) => {
  const response = await request.get('accountants');

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.length).toBeGreaterThanOrEqual(0);
});
