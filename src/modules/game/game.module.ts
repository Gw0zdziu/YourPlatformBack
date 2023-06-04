import { Module } from '@nestjs/common';
import { GameController } from './controller/game.controller';
import { GameService } from 'src/modules/game/service/game.service';

@Module({
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
