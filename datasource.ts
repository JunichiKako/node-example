import { DataSource } from 'typeorm';
import { User } from './user.entity';

export const AppDataSOurce = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  logging: false,
  entities: [User],
});
