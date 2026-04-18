import { Accountant } from '../models/accountant.ts';
import { AccountantInput } from '../models/accountant-input.ts';

export class AccountantMapper {

  public mapInputToModel(input: AccountantInput): Accountant {
    return {
      id: input.id,
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      username: input.username,
      passwordHash: input.passwordHash
    };
  }

  public mapModelToInput(model: Accountant): AccountantInput {
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