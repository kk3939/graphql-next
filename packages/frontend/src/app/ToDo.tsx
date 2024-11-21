import { Dispatch, SetStateAction } from "react";

interface ToDoComponentProps {
  data: any;
  handleAddTodo: () => Promise<void>;
  newTodo: string;
  setNewTodo: Dispatch<SetStateAction<string>>;
}

export const ToDoComponent: React.FC<ToDoComponentProps> = ({ data, handleAddTodo, newTodo, setNewTodo }) => {
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
