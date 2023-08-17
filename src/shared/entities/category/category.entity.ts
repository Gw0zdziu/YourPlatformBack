import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { User } from 'src/shared/entities/user/user.entity';
import { Game } from 'src/shared/entities/game/game.entity';

@Entity()
export class Category {
  @AutoMap()
  @PrimaryColumn('varchar',{length: 450, nullable: false})
  categoryId: string;

  @AutoMap()
  @Column('varchar',{length: 450, nullable: false})
  categoryName: string;

  @AutoMap()
  @Column('varchar',{length: 450, nullable: true})
  categoryDesc: string;

  @AutoMap()
  @Column('varchar',{length: 450, nullable: false})
  userId: string;

  @AutoMap()
  @Column('varchar',{length: 10, nullable: false})
  status: string;

  @ManyToOne(() => User, (user) => user.categories)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Game, (game) => game.category)
  @JoinColumn({ name: 'gameId', referencedColumnName: 'gameId' })
  games: Game[];
}
