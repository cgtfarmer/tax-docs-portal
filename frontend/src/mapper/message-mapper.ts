import { Message } from '../models/message.ts';
import { MessageInput } from '../models/message-input.ts';

export class MessageMapper {

public mapModelToInput(model: Message): MessageInput {
    return {
      id: model.id,
      clientId: model.clientId,
      accountantId: model.accountantId,
      sender_type: model.sender_type,
      message_text: model.message_text,
      created_at: model.created_at
    };
}

public mapInputToModel(input: MessageInput): Message {
    return {
      id: input.id ?? '',
      clientId: input.clientId ?? '',
      accountantId: input.accountantId ?? '',
      sender_type: input.sender_type ?? "Client",
      message_text: input.message_text ?? '',
      created_at: input.created_at ?? ''
    };
  } 
}