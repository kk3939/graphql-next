import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Todo } from '../entities/Todo';
import { DataSource } from 'typeorm';

@Resolver()
export class TodoResolver {
  constructor(private dataSource: DataSource) {}
  private get todoRepo() {
    return this.dataSource.getRepository(Todo);
  }

  @Query(() => [Todo])
  async getTodos() {
    return await this.todoRepo.find();
  }

  @Mutation(() => Todo)
  async createTodo(@Arg('title') title: string) {
    const todo = new Todo();
    todo.title = title;
    todo.completed = false;
    return await this.todoRepo.save(todo);
  }

  @Mutation(() => Boolean)
  async updateTodo(@Arg('id') id: number, @Arg('completed') completed: boolean) {
    const todo = await this.todoRepo.findOne({ where: { id } });
    if (!todo) return false;
    todo.completed = completed;
    await this.todoRepo.save(todo);
    return true;
  }

  @Mutation(() => Boolean)
  async deleteTodo(@Arg('id') id: number) {
    await this.todoRepo.delete({ id });
    return true;
  }
}
