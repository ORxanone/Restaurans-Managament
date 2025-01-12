import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from 'database';
import { ConfigModule } from '@nestjs/config';
import { configuration } from 'config';
import {
  BranchModule,
  LanguageModule,
  MenuItemModule,
  MenuModule,
  RestaurantModule,
  TranslationModule,
} from 'modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath:
        process.env.NODE_ENV === 'development' ? '.env.local' : '.env',
    }),
    DatabaseModule,
    RestaurantModule,
    MenuModule,
    MenuItemModule,
    BranchModule,
    LanguageModule,
    TranslationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
