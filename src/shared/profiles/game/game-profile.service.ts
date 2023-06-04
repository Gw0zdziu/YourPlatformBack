import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, ignore, Mapper } from '@automapper/core';
import { CategoryDto } from 'src/shared/dtos/category/category.dto';
import { Category } from 'src/shared/entities/category/category.entity';
import { GameDto } from 'src/shared/dtos/game/game.dto';
import { Game } from 'src/shared/entities/game/game.entity';
import { GameDataDto } from 'src/shared/dtos/game/game-data.dto';
import { UpdateGameDto } from 'src/shared/dtos/game/update-game.dto';

@Injectable()
export class GameProfileService extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        GameDto,
        Game,
        forMember((dest: Game) => dest.gameId, ignore()),
      );
      createMap(mapper, Game, GameDataDto);
      createMap(mapper, UpdateGameDto, Game);
    };
  }
}
