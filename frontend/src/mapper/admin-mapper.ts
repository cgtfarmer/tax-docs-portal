import { Admin } from '../models/admin.ts';
import { AdminInput } from '../models/admin-input.ts';

export class AdminMapper {

  public mapInputToModel(input: AdminInput): Admin {
    return {
      id: input.id,
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      username: input.username,
      passwordHash: input.passwordHash
    };
  }

  public mapModelToInput(model: Admin): AdminInput {
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