import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { GameService } from 'src/modules/game/service/game.service';
import { GameDto } from 'src/shared/dtos/game/game.dto';
import { GameDataDto } from 'src/shared/dtos/game/game-data.dto';
import { UpdateGameDto } from 'src/shared/dtos/game/update-game.dto';

@Controller('game')
export class GameController {
  constructor(private gameSvc: GameService) {}

  @Post()
  async createGame(@Body() newGame: GameDto): Promise<void> {
    await this.gameSvc.createGame(newGame);
  }

  @Get()
  async getAllGames(): Promise<GameDataDto[]> {
    return this.gameSvc.getAllGames();
  }

  @Get(':gameId')
  async getGameById(@Param('gameId') gameId: string): Promise<GameDataDto> {
    return this.gameSvc.getGameById(gameId);
  }

  @Put()
  async updateGame(@Body() updateGame: UpdateGameDto): Promise<void> {
    await this.gameSvc.updateGame(updateGame);
  }

  @Delete(':gameId')
  async deleteGame(@Param('gameId') gameId: string): Promise<void> {
    await this.gameSvc.deleteGame(gameId);
  }
}
