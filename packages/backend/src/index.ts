import 'reflect-metadata';
import { ApolloServer, ServerRegistration } from 'apollo-server-express';
import Express from 'express';
import { buildSchema } from 'type-graphql';
import { DataSource } from 'typeorm';
import { TodoResolver } from './resolvers/TodoResolver';
import { Todo } from './entities/Todo';

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

  // Check if there are any existing todos, if not seed the database
  const todoRepository = dataSource.getRepository(Todo);
  const todosCount = await todoRepository.count();

  if (todosCount === 0) {
    console.log('No todos found, seeding the database...');
    const initialTodos = [
      { title: 'Learn TypeScript', completed: false },
      { title: 'Learn GraphQL', completed: false },
      { title: 'Build a todo app', completed: false },
    ];

    for (const todoData of initialTodos) {
      const todo = todoRepository.create(todoData);
      await todoRepository.save(todo);
    }
    console.log('Seeding complete.');
  }

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
