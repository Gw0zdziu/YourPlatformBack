import { Column, Entity, IsNull, PrimaryColumn } from 'typeorm';
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
  username: string;

  @AutoMap()
  @Column('text')
  password: string;

  @Column('text', { nullable: true })
  refreshToken: string;
}
