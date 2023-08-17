import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { Category } from 'src/shared/entities/category/category.entity';
import { Game } from 'src/shared/entities/game/game.entity';

@Entity()
export class User {
  @AutoMap()
  @PrimaryColumn('varchar',{length: 450, nullable: false})
  userId: string;

  @AutoMap()
  @Column('varchar',{length: 450, nullable: false})
  userEmail: string;

  @AutoMap()
  @Column('varchar',{length: 450, nullable: false})
  username: string;

  @AutoMap()
  @Column('varchar',{length: 450, nullable: false})
  password: string;

  @Column('text', { nullable: true })
  refreshToken: string;

  @AutoMap()
  @Column('boolean', { nullable: false })
  isEmailConfirmed: boolean;

  @OneToMany(() => Category, (category) => category.user)
  categories: Category[];

  @OneToMany(() => Game, (game) => game.user)
  games: Game[];
}
