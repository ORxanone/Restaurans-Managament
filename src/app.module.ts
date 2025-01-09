import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'database';
import { ConfigModule } from '@nestjs/config';
import { configuration } from 'config';
import { RestaurantModule } from 'modules';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: 'root',
    //   database: 'restaurant',
    //   entities: [`${__dirname}/**/*.entity{.ts,.js}`],
    //   migrations: [`${__dirname}/migrations/*{.ts,.js}`],
    //   synchronize: false,
    // }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath:
        process.env.NODE_ENV === 'development' ? '.env.local' : '.env',
    }),
    DatabaseModule,
    RestaurantModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
