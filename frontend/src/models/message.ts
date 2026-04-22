export type SenderType = "Client" | "Accountant";

export interface Message {
  id: string;

  clientId: string;

  accountantId: string;

  sender_type: SenderType;

  message_text: string;

  created_at: string;
}