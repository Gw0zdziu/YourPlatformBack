import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { GameService } from 'src/modules/game/service/game.service';
import { GameDto } from 'src/shared/dtos/game/game.dto';
import { GameDataDto } from 'src/shared/dtos/game/game-data.dto';
import { UpdateGameDto } from 'src/shared/dtos/game/update-game.dto';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';

@Controller('game')
export class GameController {
  constructor(private gameSvc: GameService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async createGame(@Body() newGame: GameDto): Promise<void> {
    await this.gameSvc.createGame(newGame);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllGames(): Promise<GameDataDto[]> {
    return this.gameSvc.getAllGames();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':gameId')
  async getGameById(@Param('gameId') gameId: string): Promise<GameDataDto> {
    return this.gameSvc.getGameById(gameId);
  }
  @UseGuards(JwtAuthGuard)
  @Put()
  async updateGame(@Body() updateGame: UpdateGameDto): Promise<void> {
    await this.gameSvc.updateGame(updateGame);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':gameId')
  async deleteGame(@Param('gameId') gameId: string): Promise<void> {
    await this.gameSvc.deleteGame(gameId);
  }
}
