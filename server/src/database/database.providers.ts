import { TypeOrmModule } from '@nestjs/typeorm';

export const databaseProviders = TypeOrmModule.forRoot({
  database: process.env.DB_NAME,
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
});
