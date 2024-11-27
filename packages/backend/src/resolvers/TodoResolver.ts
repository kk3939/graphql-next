import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Todo } from '../entities/Todo';
import { dataSource } from '../datasource';
import { Repository } from 'typeorm';

@Resolver()
export class TodoResolver {
  private readonly todoRepository: Repository<Todo>;

  constructor() {
    this.todoRepository = dataSource.getRepository(Todo);
  }

  @Query(() => [Todo])
  async getTodos() {
    return await this.todoRepository.find();
  }

  @Mutation(() => Todo)
  async createTodo(@Arg('title') title: string) {
    const todo = new Todo();
    todo.title = title;
    todo.completed = false;
    return await this.todoRepository.save(todo);
  }

  @Mutation(() => Boolean)
  async updateTodo(@Arg('id') id: number, @Arg('completed') completed: boolean) {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) return false;
    todo.completed = completed;
    await this.todoRepository.save(todo);
    return true;
  }

  @Mutation(() => Boolean)
  async deleteTodo(@Arg('id') id: number) {
    await this.todoRepository.delete({ id });
    return true;
  }
}
