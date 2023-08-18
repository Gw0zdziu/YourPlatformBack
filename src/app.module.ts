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
import { GameModule } from 'src/modules/game/game.module';
import { GameProfileService } from 'src/shared/profiles/game/game-profile.service';
import { JwtModule } from '@nestjs/jwt';
import { EmailConfirmationModule } from 'src/modules/email-confirmation/email-confirmation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['./src/environments/.env.dev', '.env.prod'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: +config.get<number>('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [User, Category, Game],
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    JwtModule.register({}),
    SharedModule,
    AuthModule,
    UserModule,
    CategoryModule,
    GameModule,
    EmailConfirmationModule,
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
