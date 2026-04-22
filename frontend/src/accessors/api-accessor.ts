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
    const path = `${this.API_URL}/users`;
    const method = 'GET';
    this.logRequest(method, path);

    const response = await fetch(
      path,
      { method: method }
    );

    const data: User[] = await response.json();

    return data;
  }

  public async getUser(userId: string): Promise<User> {
    const path = `${this.API_URL}/users/${userId}`;
    const method = 'GET';
    this.logRequest(method, path);

    const response = await fetch(
      path,
      { method: method }
    );

    const data: User = await response.json();

    return data;
  }

  public async createUser(user: User): Promise<User> {
    const path = `${this.API_URL}/users`;
    const method = 'POST';
    const body = JSON.stringify(user);
    this.logRequest(method, path, body);

    const response = await fetch(path, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body
    });

    const data: User = await response.json();

    return data;
  }

  public async updateUser(user: User): Promise<User> {
    const path = `${this.API_URL}/users/${user.id ?? ''}`;
    const method = 'PUT';
    const body = JSON.stringify(user);
    this.logRequest(method, path, body);

    const response = await fetch(path, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body
    });

    const data: User = await response.json();

    return data;
  }

  public async destroyUser(userId: string): Promise<boolean> {
    const path = `${this.API_URL}/users/${userId}`;
    const method = 'DELETE';
    this.logRequest(method, path);

    const response = await fetch(
      path,
      { method: method }
    );

    return (response.status == 204);
  }

  /* Accountant API */
  public async listAccountants(): Promise<Accountant[]> {
    const path = `${this.API_URL}/accountants`;
    const method = 'GET';
    this.logRequest(method, path);

    const response = await fetch(
      path,
      { method: method }
    );

    const data: Accountant[] = await response.json();
    return data;
  }

  public async getAccountant(accountantId: string): Promise<Accountant> {
    const path = `${this.API_URL}/accountants/${accountantId}`;
    const method = 'GET';
    this.logRequest(method, path);

    const response = await fetch(
      path,
      { method: method }
    );

    const data: Accountant = await response.json();
    return data;
  }

  /* Clients API */
  public async listClients(): Promise<Client[]> {
    const path = `${this.API_URL}/clients`;
    const method = 'GET';
    this.logRequest(method, path);

    const response = await fetch(
      path,
      { method: method }
    );

    const data: Client[] = await response.json();

    return data;
  }

  public async getClient(clientId: string): Promise<Client> {
    const path = `${this.API_URL}/clients/${clientId}`;
    const method = 'GET';
    this.logRequest(method, path);

    const response = await fetch(
      path,
      { method: method }
    );

    const data: Client = await response.json();

    return data;
  }

  public async createClient(client: Client): Promise<Client> {
    const path = `${this.API_URL}/clients`;
    const method = 'POST';
    const body = JSON.stringify(client);
    this.logRequest(method, path, body);

    const response = await fetch(path, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body
    });

    const data: Client = await response.json();

    return data;
  }

  public async updateClient(client: Client): Promise<Client> {
    const path = `${this.API_URL}/clients/${client.id ?? ''}`;
    const method = 'PUT';
    const body = JSON.stringify(client);
    this.logRequest(method, path, body);

    const response = await fetch(path, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body
    });

    const data: Client = await response.json();

    return data;
  }

  public async destroyClient(clientId: string): Promise<boolean> {
    const path = `${this.API_URL}/clients/${clientId}`;
    const method = 'DELETE';
    this.logRequest(method, path);

    const response = await fetch(
      path,
      { method: method }
    );

    return (response.status == 204);
  }

  /* Admin API */
  public async listAdmins(): Promise<Admin[]> {
    const path = `${this.API_URL}/admins`;
    const method = 'GET';
    this.logRequest(method, path);

    const response = await fetch(
      path,
      { method: method }
    );

    const data: Admin[] = await response.json();

    return data;
  }

  public async getAdmin(adminId: string): Promise<Admin> {
    const path = `${this.API_URL}/admins/${adminId}`;
    const method = 'GET';
    this.logRequest(method, path);

    const response = await fetch(
      path,
      { method: method }
    );

    const data: Admin = await response.json();

    return data;
  }

  public async createAdmin(admin: Admin): Promise<Admin> {
    const path = `${this.API_URL}/admins`;
    const method = 'POST';
    const body = JSON.stringify(admin);
    this.logRequest(method, path, body);

    const response = await fetch(path, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body
    });

    const data: Admin = await response.json();

    return data;
  }

  public async updateAdmin(admin: Admin): Promise<Admin> {
    const path = `${this.API_URL}/admins/${admin.id ?? ''}`;
    const method = 'PUT';
    const body = JSON.stringify(admin);
    this.logRequest(method, path, body);

    const response = await fetch(path, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body
    });

    const data: Admin = await response.json();

    return data;
  }

  public async destroyAdmin(adminId: string): Promise<boolean> {
    const path = `${this.API_URL}/admins/${adminId}`;
    const method = 'DELETE';
    this.logRequest(method, path);

    const response = await fetch(
      path,
      { method: method }
    );

    return (response.status === 204);
  }

  /* Message API */
  public async listMessages(): Promise<Message[]> {
    const path = `${this.API_URL}/messages`;
    const method = 'GET';
    this.logRequest(method, path);

    const response = await fetch(
      path,
      { method: method }
    );

    const data: Message[] = await response.json();
    return data;
  }

  public async getMessage(messageId: string): Promise<Message> {
    const path = `${this.API_URL}/messages/${messageId}`;
    const method = 'GET';
    this.logRequest(method, path);

    const response = await fetch(
      path,
      { method: method }
    );

    const data: Message = await response.json();
    return data;
  }

  public async getMessagesByClient(clientId: string): Promise<Message[]> {
    const path = `${this.API_URL}/messages/client/${clientId}`;
    const method = 'GET';
    this.logRequest(method, path);

    const response = await fetch(
      path,
      { method: method }
    );

    const data: Message[] = await response.json();
    return data;
  }

  public async createMessage(message: Message): Promise<Message> {
    const path = `${this.API_URL}/messages`;
    const method = 'POST';
    const body = JSON.stringify(message);
    this.logRequest(method, path, body);

    const response = await fetch(path, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body
    });

    const data: Message = await response.json();
    return data;
  }

  public async updateMessage(message: Message): Promise<Message> {
    const path = `${this.API_URL}/messages/${message.id}`;
    const method = 'PUT';
    const body = JSON.stringify(message);
    this.logRequest(method, path, body);

    const response = await fetch(path, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body
    });

    const data: Message = await response.json();
    return data;
  }

  public async destroyMessage(messageId: string): Promise<boolean> {
    const path = `${this.API_URL}/messages/${messageId}`;
    const method = 'DELETE';
    this.logRequest(method, path);

    const response = await fetch(
      path,
      { method: method }
    );

    return (response.status === 204);
  }

  /* Task API */
  public async listTasks(): Promise<Task[]> {
    const path = `${this.API_URL}/tasks`;
    const method = 'GET';
    this.logRequest(method, path);

    const response = await fetch(
      path,
      { method: method }
    );

    const data: Task[] = await response.json();
    return data;
  }

  public async getTask(taskId: string): Promise<Task> {
    const path = `${this.API_URL}/tasks/${taskId}`;
    const method = 'GET';
    this.logRequest(method, path);

    const response = await fetch(
      path,
      { method: method }
    );

    const data: Task = await response.json();
    return data;
  }

  public async getTasksByClient(clientId: string): Promise<Task[]> {
    const path = `${this.API_URL}/tasks/client/${clientId}`;
    const method = 'GET';
    this.logRequest(method, path);

    const response = await fetch(
      path,
      { method: method }
    );

    const data: Task[] = await response.json();
    return data;
  }

  public async getActiveTasksByClient(clientId: string): Promise<Task[]> {
    const tasks = await this.getTasksByClient(clientId);
    return tasks.filter(t => !t.deleted_at);
  }

  public async createTask(task: Task): Promise<Task> {
    const path = `${this.API_URL}/tasks`;
    const method = 'POST';
    const body = JSON.stringify(task);
    this.logRequest(method, path, body);

    const response = await fetch(path, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body
    });

    const data: Task = await response.json();
    return data;
  }

  public async updateTask(task: Task): Promise<Task> {
    const path = `${this.API_URL}/tasks/${task.id}`;
    const method = 'PUT';
    const body = JSON.stringify(task);
    this.logRequest(method, path, body);

    const response = await fetch(path, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body
    });

    const data: Task = await response.json();
    return data;
  }

  public async deleteTask(taskId: string): Promise<boolean> {
    const path = `${this.API_URL}/tasks/${taskId}`;
    const method = 'DELETE';
    this.logRequest(method, path);

    const response = await fetch(
      path,
      { method: method }
    );

    return (response.status === 204);
  }

  private logRequest(method: string, path: string, body?: string) {
    console.log(`Fetch: ${method} - ${path}`);

    if (body) {
      console.log("\n ${body}");
    }
  }
}
