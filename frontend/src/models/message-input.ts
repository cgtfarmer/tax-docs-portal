export type SenderType = "Client" | "Accountant";

export interface MessageInput {
  id: string | undefined;

  clientId: string | undefined;

  accountantId: string | undefined;

  sender_type: SenderType | undefined;

  message_text: string | undefined;
  
  created_at: string | undefined;
}