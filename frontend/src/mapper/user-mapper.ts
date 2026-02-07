import { User } from '../models/user';
import { UserInput } from '../models/user-input';

export class UserMapper {

  public mapInputToModel(input: UserInput): User {
    return {
      id: input.id,
      firstName: input.firstName,
      lastName: input.lastName,
      age: Number.parseInt(input.age),
      weight: Number.parseFloat(input.weight),
      smoker: input.smoker
    };
  }

  public mapModelToInput(model: User): UserInput {
    return {
      id: model.id ?? '',
      firstName: model.firstName ?? '',
      lastName: model.lastName ?? '',
      age: model.age ? model.age.toString() : '',
      weight: model.weight ? model.weight.toString() : '',
      smoker: model.smoker ?? false
    };
  }
}
