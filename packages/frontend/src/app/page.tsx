"use client";
import { useState } from 'react';
import { gql, useQuery, useMutation, ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ToDoComponent } from './ToDo';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

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

export default function Home() {
  // const { data, loading, error, refetch } = useQuery(GET_TODOS);
  // const [createTodo] = useMutation(CREATE_TODO);
  // const [newTodo, setNewTodo] = useState('');

  // const handleAddTodo = async () => {
  //   if (newTodo.trim() === '') return;
  //   await createTodo({ variables: { title: newTodo } });
  //   setNewTodo('');
  //   refetch();
  // };

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  return (
    <ApolloProvider client={client}>
      <p>
        test
      </p>
      {/* <ToDoComponent 
        data={data} 
        handleAddTodo={handleAddTodo} 
        newTodo={newTodo} 
        setNewTodo={setNewTodo} 
      /> */}
    </ApolloProvider>
  );
}
