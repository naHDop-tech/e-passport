import { join as joinPath } from 'path';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { upperDirectiveTransformer } from '~/common/directives/upper-case.directive';
import { CatsModule } from './cats/cats.module';
import { UtilsModule } from '~/utils/utils.module';
import { UserModule } from '~/user/user.module';
import { JwtAuthModule } from '~/jwt-auth/jwt-auth.module';
@Module({
  imports: [
    // Config
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`],
    }),
    //GraphQl
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      subscriptions: {
        'graphql-ws': {
          path: '/subscription',
          onConnect: (context: any) => {
            const { connectionParams, extra } = context;
            // user validation will remain the same as in the example above
            // when using with graphql-ws, additional context value should be stored in the extra field
            extra.user = { user: {} };
          },
        },
      },
      typePaths: ['./**/*.graphql'],
      transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
      installSubscriptionHandlers: true,
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
      definitions: {
        path: joinPath(process.cwd(), 'src/graphql.schema.ts'),
        outputAs: 'class',
      },
      cors: {
        credentials: true,
        origin: [
          /^https?:\/\/localhost:\d+$/,
          /^https:\/\/.+?\.e-passport\.eu$/,
        ],
      },
    }),
    //Database
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get<string>('DB_HOST'),
          port: Number(config.get<string>('DB_PORT')),
          username: config.get<string>('DB_USER'),
          password: config.get<string>('DB_PASS'),
          database: config.get<string>('DB_NAME'),
          migrationsRun: true,
          entities: [`${__dirname}/**/*.entity{.ts,.js}`],
          migrations: [`${__dirname}/migrations/*{.ts,.js}`],
          applicationName: 'NestJS (TypeORM, GraphQL)',
        };
      },
    }),
    // Application modules
    CatsModule,
    UtilsModule,
    UserModule,
    JwtAuthModule,
  ],
})
export class AppModule {}
