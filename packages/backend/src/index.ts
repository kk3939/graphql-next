import 'reflect-metadata';
import { ApolloServer, ServerRegistration } from 'apollo-server-express';
import Express from 'express';
import { buildSchema } from 'type-graphql';
import { DataSource } from 'typeorm';
import { TodoResolver } from './resolvers/TodoResolver';

(async () => {
  const dataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'todo_user',
    password: 'todo_password',
    database: 'todo_db',
    entities: [__dirname + '/entities/*.ts'],
    synchronize: true,
  });

  await dataSource.initialize();

  const schema = await buildSchema({
    resolvers: [TodoResolver],
  });

  const server = new ApolloServer({ schema });

  const app = Express();
  await server.start();
  server.applyMiddleware({ app } as ServerRegistration);

  app.listen(4000, () => {
    console.log('Backend server started at http://localhost:4000/graphql');
  });
})();
