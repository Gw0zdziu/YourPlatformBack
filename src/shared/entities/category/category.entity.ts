import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { User } from 'src/shared/entities/user/user.entity';
import { Game } from 'src/shared/entities/game/game.entity';

@Entity()
export class Category {
  @AutoMap()
  @PrimaryColumn('text')
  categoryId: string;

  @AutoMap()
  @Column('text')
  categoryName: string;

  @AutoMap()
  @Column('text')
  categoryDesc: string;

  @AutoMap()
  @Column('text')
  userId: string;

  @AutoMap()
  @Column('text')
  status: string;

  @ManyToOne(() => User, (user) => user.userId)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Game, (game) => game.categoryId)
  games: Game[];
}
