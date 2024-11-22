import { Field, ObjectType } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()
@Entity()
export class Todo {
  @Field()
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Field()
  @Column()
  title: string = '';

  @Field()
  @Column()
  completed: boolean = false;
}
