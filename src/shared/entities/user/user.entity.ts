import { Column, Entity, IsNull, OneToMany, PrimaryColumn } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { Category } from 'src/shared/entities/category/category.entity';
import { CategoryDto } from 'src/shared/dtos/category/category.dto';

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

  @OneToMany(() => Category, (category) => category.userId)
  categories: Category[];
}
