import { Client } from '../models/client.ts';
import { ClientInput } from '../models/client-input.ts';

export class ClientMapper {

  public mapInputToModel(input: ClientInput): Client {
    return {
      id: input.id,
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      username: input.username,
      passwordHash: input.passwordHash
    };
  }

  public mapModelToInput(model: Client): ClientInput {
    return {
      id: model.id ?? '',
      firstName: model.firstName ?? '',
      lastName: model.lastName ?? '',
      email: model.email ?? '',
      username: model.username ?? '',
      passwordHash: model.passwordHash ?? ''
    };
  }
}
