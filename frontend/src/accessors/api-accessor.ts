/* eslint-disable @typescript-eslint/no-explicit-any */

import { User } from "../models/user";
import { Client } from "../models/client";
import { Accountant } from "../models/accountant";
import { Admin } from "../models/admin";
import { Message } from "../models/message";
import { Task } from "../models/task";

export default class ApiAccessor {
  private readonly API_URL =
    import.meta.env.VITE_API_URL as string;

  /* =========================
     Users
  ========================= */

  public async listUsers(): Promise<User[]> {
    return this.get<User[]>("/users");
  }

  public async getUser(
    userId: string
  ): Promise<User> {
    return this.get<User>(
      `/users/${userId}`
    );
  }

  public async createUser(
    user: User
  ): Promise<User> {
    return this.send<User>(
      "POST",
      "/users",
      user
    );
  }

  public async updateUser(
    user: User
  ): Promise<User> {
    return this.send<User>(
      "PUT",
      `/users/${user.id}`,
      user
    );
  }

  public async destroyUser(
    userId: string
  ): Promise<boolean> {
    return this.remove(
      `/users/${userId}`
    );
  }

  /* =========================
     Clients
  ========================= */

  public async listClients(): Promise<Client[]> {
    return this.get<Client[]>(
      "/clients"
    );
  }

  public async getClient(
    clientId: string
  ): Promise<Client> {
    return this.get<Client>(
      `/clients/${clientId}`
    );
  }

  public async createClient(
    client: Client
  ): Promise<Client> {
    return this.send<Client>(
      "POST",
      "/clients",
      client
    );
  }

  public async updateClient(
    client: Client
  ): Promise<Client> {
    return this.send<Client>(
      "PUT",
      `/clients/${client.id}`,
      client
    );
  }

  public async destroyClient(
    clientId: string
  ): Promise<boolean> {
    return this.remove(
      `/clients/${clientId}`
    );
  }

  public async getClientsByAccountant(
    accountantId: string
  ): Promise<Client[]> {
    return this.get<Client[]>(
      `/clients/accountant/${accountantId}/clients`
    );
  }

  /* =========================
     Accountants
  ========================= */

  public async listAccountants(): Promise<Accountant[]> {
    return this.get<Accountant[]>(
      "/accountants"
    );
  }

  public async getAccountant(
    accountantId: string
  ): Promise<Accountant> {
    return this.get<Accountant>(
      `/accountants/${accountantId}`
    );
  }

  public async createAccountant(
    accountant: Accountant
  ): Promise<Accountant> {
    return this.send<Accountant>(
      "POST",
      "/accountants",
      accountant
    );
  }

  public async updateAccountant(
    accountant: Accountant
  ): Promise<Accountant> {
    return this.send<Accountant>(
      "PUT",
      `/accountants/${accountant.id}`,
      accountant
    );
  }

  public async destroyAccountant(
    accountantId: string
  ): Promise<boolean> {
    return this.remove(
      `/accountants/${accountantId}`
    );
  }

  /* =========================
     Admins
  ========================= */

  public async listAdmins(): Promise<Admin[]> {
    return this.get<Admin[]>(
      "/admins"
    );
  }

  public async getAdmin(
    adminId: string
  ): Promise<Admin> {
    return this.get<Admin>(
      `/admins/${adminId}`
    );
  }

  public async createAdmin(
    admin: Admin
  ): Promise<Admin> {
    return this.send<Admin>(
      "POST",
      "/admins",
      admin
    );
  }

  public async updateAdmin(
    admin: Admin
  ): Promise<Admin> {
    return this.send<Admin>(
      "PUT",
      `/admins/${admin.id}`,
      admin
    );
  }

  public async destroyAdmin(
    adminId: string
  ): Promise<boolean> {
    return this.remove(
      `/admins/${adminId}`
    );
  }

  /* =========================
     Messages
  ========================= */

  public async listMessages(): Promise<Message[]> {
    return this.get<Message[]>(
      "/messages"
    );
  }

  public async getMessage(
    messageId: string
  ): Promise<Message> {
    return this.get<Message>(
      `/messages/${messageId}`
    );
  }

  public async getMessagesByClient(
    clientId: string
  ): Promise<Message[]> {
    return this.get<Message[]>(
      `/messages/client/${clientId}`
    );
  }

  public async createMessage(
    message: Message
  ): Promise<Message> {
    return this.send<Message>(
      "POST",
      "/messages",
      message
    );
  }

  public async updateMessage(
    message: Message
  ): Promise<Message> {
    return this.send<Message>(
      "PUT",
      `/messages/${message.id}`,
      message
    );
  }

  public async destroyMessage(
    messageId: string
  ): Promise<boolean> {
    return this.remove(
      `/messages/${messageId}`
    );
  }

  /* =========================
     Tasks
  ========================= */

  public async listTasks(): Promise<Task[]> {
    return this.get<Task[]>(
      "/tasks"
    );
  }

  public async getTask(
    taskId: string
  ): Promise<Task> {
    return this.get<Task>(
      `/tasks/${taskId}`
    );
  }

  public async getTasksByClient(
    clientId: string
  ): Promise<Task[]> {
    return this.get<Task[]>(
      `/tasks/client/${clientId}`
    );
  }

  public async createTask(
    task: Task
  ): Promise<Task> {
    return this.send<Task>(
      "POST",
      "/tasks",
      task
    );
  }

  public async updateTask(
    task: Task
  ): Promise<Task> {
    return this.send<Task>(
      "PUT",
      `/tasks/${task.id}`,
      task
    );
  }

  public async deleteTask(
    taskId: string
  ): Promise<boolean> {
    return this.remove(
      `/tasks/${taskId}`
    );
  }

  /* =========================
     Core Helpers
  ========================= */

  private async get<T>(
    endpoint: string
  ): Promise<T> {
    const path =
      `${this.API_URL}${endpoint}`;

    this.logRequest(
      "GET",
      path
    );

    const response =
      await fetch(path, {
        method: "GET"
      });

    return await response.json();
  }

  private async send<T>(
    method:
      | "POST"
      | "PUT",
    endpoint: string,
    bodyObj: any
  ): Promise<T> {
    const path =
      `${this.API_URL}${endpoint}`;

    const body =
      JSON.stringify(bodyObj);

    this.logRequest(
      method,
      path,
      body
    );

    const response =
      await fetch(path, {
        method,
        headers: {
          "Content-Type":
            "application/json"
        },
        body
      });

    return await response.json();
  }

  private async remove(
    endpoint: string
  ): Promise<boolean> {
    const path =
      `${this.API_URL}${endpoint}`;

    this.logRequest(
      "DELETE",
      path
    );

    const response =
      await fetch(path, {
        method: "DELETE"
      });

    return (
      response.status === 204
    );
  }

  private logRequest(
    method: string,
    path: string,
    body?: string
  ) {
    console.log(
      `Fetch: ${method} ${path}`
    );

    if (body) {
      console.log(body);
    }
  }
}
