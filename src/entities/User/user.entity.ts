import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { AutoMap } from '@automapper/classes';

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
  userName: string;

  @AutoMap()
  @Column('text')
  password: string;
}
