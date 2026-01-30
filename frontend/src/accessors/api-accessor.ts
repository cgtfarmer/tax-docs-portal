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
    const response = await fetch(`${this.API_URL}/users`);

    const data = await response.json() as any[];

    const users = this.mapper.mapUsersToModels(data);

    return users;
  }

  public async getUser(userId: string): Promise<User> {
    const response = await fetch(`${this.API_URL}/users/${userId}`);

    const data = await response.json() as any;

    const user = this.mapper.mapUserToModel(data);

    return user;
  }

  // public async create(user: any): Promise<any> {
  //   // TODO: Implement

  //   return user;
  // }

  // public async update(user: any): Promise<any> {
  //   // TODO: Implement

  //   return user;
  // }

  // public async destroy(userId: string): Promise<boolean> {
  //   // TODO: Implement

  //   return false;
  // }
}
