import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, ignore, Mapper } from '@automapper/core';
import { CreateUserDto } from 'src/shared/dtos/user/create-user.dto';
import { User } from 'src/shared/entities/user/user.entity';
import { UpdateUserDto } from 'src/shared/dtos/user/update-user.dto';
import { UserDto } from 'src/shared/dtos/user/user.dto';

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
        forMember((dest: User) => dest.refreshToken, ignore()),
        forMember((dest: User) => dest.isEmailConfirmed, ignore()),
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
