import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, ignore, Mapper } from '@automapper/core';
import { User } from '../../../entities/User/user.entity';
import { UserDataDto } from '../../../modules/auth/dtos/user-data.dto';

@Injectable()
export class AuthProfileService extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, User, UserDataDto);
    };
  }
}
