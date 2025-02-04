import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { IConfiguration } from 'src/core/config/Iconfig/configuration';

@Module({
  imports: [
    //example to connect to mongodb
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<IConfiguration['connectionUrl']>(
          'connectionUrl',
        ),
        connectionFactory: () => {
          const connection = mongoose.connection;
          setTimeout(
            () =>
              mongoose.connect(
                configService.get<IConfiguration['connectionUrl']>(
                  'connectionUrl',
                ),
              ),
            5000,
          );
          return connection;
        },
      }),
    }),
    //example to connect to postgres
    /*  TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<IConfiguration['connectionUrl']>(
          'connectionUrl',
        ),
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'postgres',
  ],
    }), */
    //example to connect to mysql
    /*  TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<IConfiguration['connectionUrl']>(
          'connectionUrl',
        ),
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'postgres',
      }),
    }), */
    //example to connect to sqlite
    /*  TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: ':memory:',
      }),
    }), */
    //example to connect to mssql
    /*  TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get<IConfiguration['connectionUrl']>(
          'connectionUrl',
        ),
        port: 1433,
        username: 'sa',
        password: 'password',
        database: 'postgres',
      }),
    }), */
    //example to connect to oracle
    /*  TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'oracle',
        host: configService.get<IConfiguration['connectionUrl']>(
          'connectionUrl',
        ),
        port: 1521,
        username: 'system',
        password: 'password',
        database: 'postgres',
      }),
    }), */
  ],
})
export class DatabaseModule {}
