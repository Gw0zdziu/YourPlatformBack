import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AutoMap } from "@automapper/classes";

@Entity()
export class User {

  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @AutoMap()
  @Column()
  userEmail: string;

  @AutoMap()
  @Column()
  userName: string;

  @AutoMap()
  @Column()
  password: string;
}
