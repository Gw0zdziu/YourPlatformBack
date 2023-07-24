import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { User } from 'src/shared/entities/user/user.entity';
import { Category } from 'src/shared/entities/category/category.entity';

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

  @AutoMap()
  @Column('text')
  gameName: string;

  @AutoMap()
  @Column('text')
  gameDesc: string;

  @AutoMap()
  @Column('decimal')
  gameRating: number;

  @ManyToOne(() => User, (user: User) => user.games)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Category, (category: Category) => category.games)
  @JoinColumn({ name: 'categoryId', referencedColumnName: 'categoryId' })
  category: Category;
}
