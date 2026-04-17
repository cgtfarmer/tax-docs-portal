/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { User } from '../models/user';
import { Accountant } from '../models/accountant';
import { Client} from '../models/client'
import { Admin } from '../models/admin'
import { Message } from '../models/message'
import { Task } from '../models/task'

export default class ApiAccessor {

  private readonly API_URL = import.meta.env.VITE_API_URL as string;

  /* User API */
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

  /* Accountant API */
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
  
  /* Clients API */
  public async listClients(): Promise<Client[]> {
    const response = await fetch(
      `${this.API_URL}/clients`,
      { method: 'GET' }
    );

    const data: Client[] = await response.json();

    return data;
  }

  public async getClient(clientId: string): Promise<Client> {
    const response = await fetch(
      `${this.API_URL}/clients/${clientId}`,
      { method: 'GET' }
    );

    const data: Client = await response.json();

    return data;
  }

  public async createClient(client: Client): Promise<Client> {
    const response = await fetch(`${this.API_URL}/clients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(client)
    });

    const data: Client = await response.json();

    return data;
  }

  public async updateClient(client: Client): Promise<Client> {
    const response = await fetch(`${this.API_URL}/clients/${client.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(client)
    });

    const data: Client = await response.json();

    return data;
  }

  public async destroyClient(clientId: string): Promise<boolean> {
    const response = await fetch(
      `${this.API_URL}/clients/${clientId}`,
      { method: 'DELETE' }
    );

    return (response.status == 204);
  }

  /* Admin API */
  public async listAdmins(): Promise<Admin[]> {
    const response = await fetch(
      `${this.API_URL}/admins`,
      { method: 'GET' }
    );

    const data: Admin[] = await response.json();

    return data;
  }

  public async getAdmin(adminId: string): Promise<Admin> {
    const response = await fetch(
      `${this.API_URL}/admins/${adminId}`,
      { method: 'GET' }
    );

    const data: Admin = await response.json();

    return data;
  }

  public async createAdmin(admin: Admin): Promise<Admin> {
    const response = await fetch(`${this.API_URL}/admins`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(admin)
    });

    const data: Admin = await response.json();

    return data;
  }

  public async updateAdmin(admin: Admin): Promise<Admin> {
    const response = await fetch(`${this.API_URL}/admins/${admin.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(admin)
    });

    const data: Admin = await response.json();

    return data;
  }

  public async destroyAdmin(adminId: string): Promise<boolean> {
    const response = await fetch(
      `${this.API_URL}/admins/${adminId}`,
      { method: 'DELETE' }
    );

    return (response.status === 204);
  }

  /* Message API */
  public async listMessages(): Promise<Message[]> {
    const response = await fetch(
      `${this.API_URL}/messages`,
      { method: 'GET' }
    );

    const data: Message[] = await response.json();
    return data;
  }

  public async getMessage(messageId: string): Promise<Message> {
    const response = await fetch(
      `${this.API_URL}/messages/${messageId}`,
      { method: 'GET' }
    );

    const data: Message = await response.json();
    return data;
  }

  public async getMessagesByClient(clientId: string): Promise<Message[]> {
    const response = await fetch(
      `${this.API_URL}/messages/client/${clientId}`,
      { method: 'GET' }
    );

    const data: Message[] = await response.json();
    return data;
  }

  public async createMessage(message: Message): Promise<Message> {
    const response = await fetch(`${this.API_URL}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message)
    });

    const data: Message = await response.json();
    return data;
  }

  public async updateMessage(message: Message): Promise<Message> {
    const response = await fetch(`${this.API_URL}/messages/${message.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message)
    });

    const data: Message = await response.json();
    return data;
  }

  public async destroyMessage(messageId: string): Promise<boolean> {
    const response = await fetch(
      `${this.API_URL}/messages/${messageId}`,
      { method: 'DELETE' }
    );

    return (response.status === 204);
  }

  /* Task API */
  public async listTasks(): Promise<Task[]> {
    const response = await fetch(
      `${this.API_URL}/tasks`,
      { method: 'GET' }
    );

    const data: Task[] = await response.json();
    return data;
  }

  public async getTask(taskId: string): Promise<Task> {
    const response = await fetch(
      `${this.API_URL}/tasks/${taskId}`,
      { method: 'GET' }
    );

    const data: Task = await response.json();
    return data;
  }

  public async getTasksByClient(clientId: string): Promise<Task[]> {
    const response = await fetch(
      `${this.API_URL}/tasks/client/${clientId}`,
      { method: 'GET' }
    );

    const data: Task[] = await response.json();
    return data;
  }

  public async getActiveTasksByClient(clientId: string): Promise<Task[]> {
    const tasks = await this.getTasksByClient(clientId);
    return tasks.filter(t => !t.deleted_at);
  }

  public async createTask(task: Task): Promise<Task> {
    const response = await fetch(`${this.API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task)
    });

    const data: Task = await response.json();
    return data;
  }

  public async updateTask(task: Task): Promise<Task> {
    const response = await fetch(`${this.API_URL}/tasks/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task)
    });

    const data: Task = await response.json();
    return data;
  }

  public async deleteTask(taskId: string): Promise<boolean> {
    const response = await fetch(
      `${this.API_URL}/tasks/${taskId}`,
      { method: 'DELETE' }
    );

    return (response.status === 204);
  }
}
