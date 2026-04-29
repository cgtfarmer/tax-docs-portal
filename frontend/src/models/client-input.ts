// src/models/client-input.ts

export interface ClientInput {
  id?: string;

  firstName?: string;

  lastName?: string;

  email?: string;

  username?: string;

  passwordHash?: string;

  accountantId?: string | null;
}