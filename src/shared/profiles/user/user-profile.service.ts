import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, ignore, Mapper } from '@automapper/core';
import { CreateUserDto } from 'src/modules/user/dtos/create-user.dto';
import { User } from 'src/modules/user/entity/user.entity';
import { UpdateUserDto } from 'src/modules/user/dtos/update-user.dto';
import { UserDto } from 'src/modules/user/dtos/user.dto';

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
        forMember((dest: User) => dest.userId, ignore()),
      );
      createMap(
        mapper,
        UpdateUserDto,
        User,
        forMember((dest: User) => dest.password, ignore()),
      );
      createMap(mapper, User, UserDto);
    };
  }
}
