/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { User } from '../models/user';

export class ApiAccessorMapper {
  public mapUsersToModels(dtos: any[] | undefined): User[] {
    if (!dtos) return [];

    return dtos.map(dto => this.mapUserToModel(dto));
  }

  public mapUserToModel(dto: any): User {
    return {
      id: dto.id ?? '',
      firstName: dto.firstName ?? '',
      lastName: dto.lastName ?? '',
      age: dto.age ? dto.age.toString() : '',
      weight: dto.weight ? dto.weight.toString() : '',
      smoker: dto.smoker ?? false
    };
  }
}
