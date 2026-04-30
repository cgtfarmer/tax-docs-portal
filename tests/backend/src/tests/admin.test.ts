import { test, expect } from '@playwright/test';
import PwHelpers from './pw-helpers';

test('create admin', async ({ request }) => {
  const inputData = {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin.user@example.com',
    username: 'adminuser',
    passwordHash: 'hashed-password-123'
  };

  const response = await request.post('admins', { data: inputData });

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

test('retrieve admin', async ({ request }) => {
  const createAdminBody = await PwHelpers.createDefaultAdmin(request);
  const newAdminId = createAdminBody.id;

  const response = await request.get(`admins/${newAdminId}`);

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.id).toBeTruthy();
  expect(body.id).toBe(newAdminId);
});

test('update admin', async ({ request }) => {
  const createAdminBody = await PwHelpers.createDefaultAdmin(request);

  const inputData = {
    id: createAdminBody.id,
    firstName: 'Updated',
    lastName: 'Admin',
    email: 'updated.admin@example.com',
    username: 'updatedadmin',
    passwordHash: 'updated-hashed-password-456'
  };

  const response = await request.put(`admins/${inputData.id}`, { data: inputData });

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

test('destroy admin', async ({ request }) => {
  const createAdminBody = await PwHelpers.createDefaultAdmin(request);
  const newAdminId = createAdminBody.id;

  const response = await request.delete(`admins/${newAdminId}`);

  expect(response.status()).toBe(204);
});

test('list admins', async ({ request }) => {
  const response = await request.get('admins');

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.length).toBeGreaterThanOrEqual(0);
});