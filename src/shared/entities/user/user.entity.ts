import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { Category } from 'src/shared/entities/category/category.entity';
import { Game } from 'src/shared/entities/game/game.entity';

@Entity()
export class User {
  @AutoMap()
  @PrimaryColumn('text')
  userId: string;

  @AutoMap()
  @Column('text')
  userEmail: string;

  @AutoMap()
  @Column('text')
  username: string;

  @AutoMap()
  @Column('text')
  password: string;

  @Column('text', { nullable: true })
  refreshToken: string;

  @AutoMap()
  @Column('boolean', { nullable: false })
  isEmailConfirmed: boolean;

  @OneToMany(() => Category, (category) => category.userId)
  categories: Category[];

  @OneToMany(() => Game, (game) => game.userId)
  games: Game[];
}
