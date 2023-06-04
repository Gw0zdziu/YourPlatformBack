import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/shared/entities/user/user.entity';
import { UserService } from 'src/modules/user/service/user.service';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { UserProfileService } from './shared/profiles/user/user-profile.service';
import { AuthModule } from './modules/auth/auth.module';
import { AuthProfileService } from './shared/profiles/auth/auth-profile.service';
import { SharedModule } from './shared/shared.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Category } from 'src/shared/entities/category/category.entity';
import { UserModule } from 'src/modules/user/user.module';
import { CategoryModule } from 'src/modules/category/category.module';
import { CategoryProfileService } from 'src/shared/profiles/category/category-profile.service';
import { Game } from 'src/shared/entities/game/game.entity';
import { GameService } from 'src/modules/game/service/game.service';
import { GameModule } from 'src/modules/game/game.module';
import { GameProfileService } from 'src/shared/profiles/game/game-profile.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'YourPlatform',
        entities: [User, Category, Game],
        synchronize: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    SharedModule,
    AuthModule,
    UserModule,
    CategoryModule,
    GameModule,
  ],
  controllers: [],
  providers: [
    AppService,
    UserService,
    UserProfileService,
    CategoryProfileService,
    AuthProfileService,
    GameProfileService,
  ],
})
export class AppModule {}
