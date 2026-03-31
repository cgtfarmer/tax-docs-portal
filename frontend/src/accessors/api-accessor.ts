/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { User } from '../models/user';
import { Accountant } from '../models/accountant';

export default class ApiAccessor {

  private readonly API_URL = import.meta.env.VITE_API_URL as string;

  public async listUsers(): Promise<User[]> {
    const response = await fetch(
      `${this.API_URL}/users`,
      { method: 'GET' }
    );

    const data: User[] = await response.json();

    return data;
  }

  public async getUser(userId: string): Promise<User> {
    const response = await fetch(
      `${this.API_URL}/users/${userId}`,
      { method: 'GET' }
    );

    const data: User = await response.json();

    return data;
  }

  public async createUser(user: User): Promise<User> {
    const response = await fetch(`${this.API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    });

    const data: User = await response.json();

    return data;
  }

  public async updateUser(user: User): Promise<User> {
    const response = await fetch(`${this.API_URL}/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    });

    const data: User = await response.json();

    return data;
  }

  public async destroyUser(userId: string): Promise<boolean> {
    const response = await fetch(
      `${this.API_URL}/users/${userId}`,
      { method: 'DELETE' }
    );

    return (response.status == 204);
  }

  public async listAccountants(): Promise<Accountant[]> {
    const response = await fetch(
      `${this.API_URL}/accountants`,
      { method: 'GET' }
    );

  const data: Accountant[] = await response.json();
    return data;
  }

    public async getAccountant(accountantId: string): Promise<Accountant> {
    const response = await fetch(
      `${this.API_URL}/accountants/${accountantId}`,
      { method: 'GET' }
    );

    const data: Accountant = await response.json();

    return data;
  }

}