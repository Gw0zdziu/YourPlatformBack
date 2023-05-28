import { Column, Entity, PrimaryColumn } from 'typeorm';
import { AutoMap } from '@automapper/classes';

@Entity()
export class Game {
  @AutoMap()
  @PrimaryColumn('text')
  gameId: string;

  @AutoMap()
  @Column('text')
  categoryId: string;

  @AutoMap()
  @Column('text')
  userId: string;

  @Column('text')
  gameName: string;

  @Column('text')
  gameDesc: string;

  @Column('decimal')
  gameRating: number;
}
