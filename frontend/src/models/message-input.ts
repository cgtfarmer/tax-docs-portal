export type SenderType =
  "CLIENT" |
  "ACCOUNTANT";

export interface MessageInput {
  id?: string;

  clientId?: string;

  accountantId?: string;

  senderType?: SenderType;

  messageText?: string;

  createdAt?: string;
}