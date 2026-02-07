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
}
