import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User/user.entity';
import { UserService } from './services/user/user.service';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { UserProfileService } from "./shared/profiles/user/user-profile.service";
import { HashService } from './shared/hash/hash/hash.service';
import { UserController } from './controllers/user/user.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'postgres',
      database: 'YourPlatform',
      entities: [User],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, UserProfileService, HashService],
})
export class AppModule {}
