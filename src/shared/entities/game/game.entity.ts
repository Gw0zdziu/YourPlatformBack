import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { User } from 'src/shared/entities/user/user.entity';
import { Category } from 'src/shared/entities/category/category.entity';

@Entity()
export class Game {
  @AutoMap()
  @PrimaryColumn('varchar',{length: 450, nullable: false})
  gameId: string;

  @AutoMap()
  @Column('varchar',{length: 450, nullable: false})
  categoryId: string;

  @AutoMap()
  @Column('varchar',{length: 450, nullable: false})
  userId: string;

  @AutoMap()
  @Column('varchar', { length: 450, nullable: false })
  gameName: string;

  @AutoMap()
  @Column('varchar', { length: 450, nullable: true })
  gameDesc: string;

  @AutoMap()
  @Column('int', { nullable: true })
  gameRating: number;

  @ManyToOne(() => User, (user: User) => user.games)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Category, (category: Category) => category.games)
  @JoinColumn({ name: 'categoryId', referencedColumnName: 'categoryId' })
  category: Category;
}
