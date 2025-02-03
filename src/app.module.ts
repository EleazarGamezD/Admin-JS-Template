import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration, {
  IConfiguration,
} from './core/config/Iconfig/configuration';
import { DatabaseModule } from './modules/database/database.module';

const DEFAULT_ADMIN = {
  email: 'admin@example.com',
  password: 'password',
};

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [configuration],
      isGlobal: true,
    }),
    // AdminJS version 7 is ESM-only. In order to import it, you have to use dynamic imports.
    import('@adminjs/nestjs').then(({ AdminModule }) =>
      AdminModule.createAdminAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          adminJsOptions: {
            rootPath: '/admin',
            resources: [],
          },
          auth: {
            authenticate,
            cookieName:
              configService.get<IConfiguration['adminjs_cookieName']>(
                'adminjs_cookieName',
              ),
            cookiePassword: configService.get<
              IConfiguration['adminjs_cookieSecret']
            >('adminjs_cookieSecret'),
          },
          sessionOptions: {
            resave: true,
            saveUninitialized: true,
            secret: configService.get<IConfiguration['adminjs_sessionSecret']>(
              'adminjs_sessionSecret',
            ),
          },
        }),
      }),
    ),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
