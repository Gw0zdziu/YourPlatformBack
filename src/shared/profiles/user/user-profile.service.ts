import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, ignore, Mapper } from '@automapper/core';
import { CreateUserDto } from '../../../dtos/User/create-user.dto';
import { User } from '../../../entities/User/user.entity';

@Injectable()
export class UserProfileService extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        CreateUserDto,
        User,
        forMember((dest) => dest.userId, ignore()),
      );
    };
  }
}
