import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { GameDto } from 'src/shared/dtos/game/game.dto';
import { Game } from 'src/shared/entities/game/game.entity';
import { v4 as uuid } from 'uuid';
import { GameDataDto } from 'src/shared/dtos/game/game-data.dto';
import { UpdateGameDto } from 'src/shared/dtos/game/update-game.dto';
import { GameListDto } from "src/shared/dtos/game/game-list.dto";

@Injectable()
export class GameService {
  constructor(
    @InjectDataSource() private dataSource: DataSource,
    @InjectMapper() private classMapper: Mapper,
  ) {}

  async getGameById(gameId: string): Promise<GameDataDto>{
    const game = await this.dataSource
      .getRepository(Game)
      .createQueryBuilder('game')
      .where('game.gameId = :gameId', { gameId })
      .getOne();
    if (!game){
      throw new HttpException('Taka gra nie istnieje', HttpStatus.NOT_FOUND);
    }
    return game;
  }

  async createGame(newGame: GameDto): Promise<void> {
    const game = await this.dataSource.getRepository(Game)
      .createQueryBuilder('game')
      .where('game.gameName = :gameName', { gameName: newGame.gameName })
      .getExists();
    if (game){
      throw new HttpException('Taka gra już istnieje', HttpStatus.BAD_REQUEST);
    }
    const gameMap = this.classMapper.map(newGame, GameDto, Game);
    gameMap.gameId = uuid();
    await this.dataSource.createQueryBuilder()
      .insert()
      .into(Game)
      .values(gameMap)
      .execute();
  }

  async updateGame(updateGame: UpdateGameDto): Promise<void> {
    const game = await this.dataSource
      .getRepository(Game)
      .createQueryBuilder('game')
      .select(['game.gameId', 'game.gameName'])
      .where('game.gameId != :gameId', { gameId: updateGame.gameId })
      .andWhere('game.gameName = :gameName', { gameName: updateGame.gameName })
      .getExists();
    if (game) {
      throw new HttpException(
        'Taka nazwa już istnieje',
        HttpStatus.BAD_REQUEST,
      );
    }
    const gameMap = this.classMapper.map(updateGame, UpdateGameDto, Game);
    await this.dataSource
      .createQueryBuilder()
      .update(Game)
      .set(gameMap)
      .where('gameId = :gameId', { gameId: updateGame.gameId })
      .execute();
  }

  async getAllGames(): Promise<GameDataDto[]> {
    const allGames = await this.dataSource
      .getRepository(Game)
      .createQueryBuilder('game')
      .getMany();
    const allGamesMap = this.classMapper.mapArray(allGames, Game, GameDataDto);
    return allGamesMap;
  }

  async deleteGame(gameId: string): Promise<void>{
    const game = await this.dataSource
      .getRepository(Game)
      .createQueryBuilder('game')
      .where('game.gameId = :gameId', { gameId })
      .getExists();
    if (!game) {
      throw new HttpException('Taka gra nie istnieje', HttpStatus.NOT_FOUND);
    }
    await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(Game)
      .where('gameId = :gameId', { gameId })
      .execute();
  }

  async getGameByUserId(userId: string){
    const games = await this.dataSource
      .getRepository(Game)
      .createQueryBuilder('game')
      .leftJoinAndSelect('game.category', 'category')
      .select(['game', 'category.categoryName'])
      .where('game.userId = :userId', { userId })
      .getMany();

    if (!games){
      throw new HttpException(
        'Użytkownika nie posiada żadnych kategorii',
        HttpStatus.NOT_FOUND,)
    }
    return games;
  }
}
