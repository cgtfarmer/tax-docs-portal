import { APIRequestContext } from '@playwright/test';

export default class PwHelpers {
  static async createDefaultUser(request: APIRequestContext) {
    const createUserResponse = await request.post('/users', {
      data: {
        firstName: 'John',
        lastName: 'Doe',
        age: 40,
        weight: 200
      }
    });

    return await createUserResponse.json();
  };

  static async createDefaultAccountant(request: APIRequestContext) {
    const createAccountantResponse = await request.post('/accountants', {
      data: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        username: 'johndoe',
        passwordHash: 'hashed-password'
      }
    });

    return await createAccountantResponse.json();
  };

  static async createDefaultClient(request: APIRequestContext) {
    const createClientResponse = await request.post('/clients', {
      data: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        username: 'johndoe',
        passwordHash: 'hashed-password'
      }
    });

    return await createClientResponse.json();
  }
}
