import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';
import { User } from 'src/modules/user/entity/user.entity';
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
