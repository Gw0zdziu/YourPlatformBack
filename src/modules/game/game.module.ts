import { Module } from '@nestjs/common';
import { GameController } from './controller/game.controller';

@Module({
  controllers: [GameController]
})
export class GameModule {}
