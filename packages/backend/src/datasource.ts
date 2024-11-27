import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'todo_user',
  password: 'todo_password',
  database: 'todo_db',
  entities: [__dirname + '/entities/*.ts'],
  synchronize: true,
  logging: "all"
});
