import { APIRequestContext, expect } from '@playwright/test';

export default class PwHelpers {

  static async createDefaultUser(request: APIRequestContext) {
    const response = await request.post('users', {
      data: {
        firstName: 'John',
        lastName: 'Doe',
        age: 40,
        weight: 200
      }
    });

    expect(response.status()).toBe(201);

    return await response.json();
  }

  static async createDefaultAccountant(request: APIRequestContext) {
    const unique = Date.now();

    const response = await request.post('accountants', {
      data: {
        firstName: 'John',
        lastName: 'Doe',
        email: `accountant${unique}@example.com`,
        username: `accountant${unique}`,
        passwordHash: 'hashed-password'
      }
    });

    expect(response.status()).toBe(201);

    return await response.json();
  }

  static async createDefaultClient(request: APIRequestContext) {
    const unique = Date.now();

    const response = await request.post('clients', {
      data: {
        firstName: 'John',
        lastName: 'Doe',
        email: `client${unique}@example.com`,
        username: `client${unique}`,
        passwordHash: 'hashed-password'
      }
    });

    expect(response.status()).toBe(201);

    return await response.json();
  }

  static async createDefaultAdmin(request: APIRequestContext) {
    const unique = Date.now();

    const response = await request.post('admins', {
      data: {
        firstName: 'Admin',
        lastName: 'User',
        email: `admin${unique}@example.com`,
        username: `admin${unique}`,
        passwordHash: 'hashed-password'
      }
    });

    expect(response.status()).toBe(201);

    return await response.json();
  }

  static async createDefaultMessage(
    request: APIRequestContext,
    clientId: string,
    accountantId: string
  ) {
    const response = await request.post('messages', {
      data: {
        clientId,
        accountantId,
        senderType: 'CLIENT',
        messageText: 'Hello, this is a test message'
      }
    });

    expect(response.status()).toBe(201);

    return await response.json();
  }

  static async createDefaultTask(
    request: APIRequestContext,
    clientId: string,
    accountantId: string
  ) {
    const response = await request.post('tasks', {
      data: {
        clientId,
        accountantId,
        title: 'Test Task',
        description: 'This is a test task',
        taskStatus: 'In Progress'
      }
    });

    expect(response.status()).toBe(201);

    return await response.json();
  }
}