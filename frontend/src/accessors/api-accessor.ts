/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { User } from '../models/user';
import { ApiAccessorMapper } from './api-accessor-mapper';

export default class ApiAccessor {

  private readonly mapper: ApiAccessorMapper;
  private readonly API_URL = import.meta.env.VITE_API_URL as string;

  constructor() {
    this.mapper = new ApiAccessorMapper();
  }

  public async listUsers(): Promise<User[]> {
    const response = await fetch(
      `${this.API_URL}/users`,
      { method: 'GET' }
    );

    const data = await response.json() as any[];

    const users = this.mapper.mapUsersToModels(data);

    return users;
  }

  public async getUser(userId: string): Promise<User> {
    const response = await fetch(
      `${this.API_URL}/users/${userId}`,
      { method: 'GET' }
    );

    const data = await response.json() as any;

    const user = this.mapper.mapUserToModel(data);

    return user;
  }

  public async createUser(user: User): Promise<User> {
    const response = await fetch(`${this.API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    });

    const data = await response.json() as any;

    const result = this.mapper.mapUserToModel(data);

    return result;
  }

  public async updateUser(user: User): Promise<User> {
    const response = await fetch(`${this.API_URL}/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    });

    const data = await response.json() as any;

    const result = this.mapper.mapUserToModel(data);

    return result;
  }

  public async destroyUser(userId: string): Promise<User> {
    const response = await fetch(
      `${this.API_URL}/users/${userId}`,
      { method: 'DELETE' }
    );

    const data = await response.json() as any;

    const user = this.mapper.mapUserToModel(data);

    return user;
  }
}
