import { gql, useQuery, useMutation } from "@apollo/client";
import {  useState } from "react";



const GET_TODOS = gql`
  query GetTodos {
    getTodos {
      id
      title
      completed
    }
  }
`;

const CREATE_TODO = gql`
  mutation CreateTodo($title: String!) {
    createTodo(title: $title) {
      id
      title
      completed
    }
  }
`;

export const ToDoComponent: React.FC= () => {

  const { data, loading, error, refetch } = useQuery(GET_TODOS);
  const [createTodo] = useMutation(CREATE_TODO);
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = async () => {
    if (newTodo.trim() === '') return;
    await createTodo({ variables: { title: newTodo } });
    setNewTodo('');
    refetch();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
        <h1>Todo List</h1>
        <ul>
          {data?.getTodos.map((todo: any) => (
            <li key={todo.id}>
              {todo.title} - {todo.completed ? 'Completed' : 'Pending'}
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
  );
}
