import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

console.log('Process', ConfigService);

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      type: 'mysql',
      host: configService.getOrThrow('DB_HOST'),
      port: parseInt(configService.getOrThrow('DB_PORT'), 10) || 3306,
      username: configService.getOrThrow('DB_USER'),
      password: configService.getOrThrow('DB_PASSWORD'),
      database: configService.getOrThrow('DB_NAME'),
      entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
      migrations: [`${__dirname}/migrations/*{.ts,.js}`],
      synchronize: false,
    }),
  }),
];
