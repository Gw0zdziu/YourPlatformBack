import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entity/user.entity';
import { UserService } from 'src/modules/user/service/user.service';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { UserProfileService } from "./shared/profiles/user/user-profile.service";
import { UserController } from 'src/modules/user/controller/user.controller';
import { AuthModule } from './modules/auth/auth.module';
import { AuthProfileService } from './shared/profiles/auth/auth-profile.service';
import { SharedModule } from './shared/shared.module';


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
      synchronize: false,
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    SharedModule,
    AuthModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, UserProfileService, AuthProfileService],
})
export class AppModule {}
