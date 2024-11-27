"use client";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ToDoComponent } from './ToDo';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { __DEV__ } from '@apollo/client/utilities/globals';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});



export default function Home() {
  if (__DEV__) {
    // Adds messages only in a dev environment
    loadDevMessages();
    loadErrorMessages();
  }

  return (
    <ApolloProvider client={client}>
      <ToDoComponent />
    </ApolloProvider>
  );
}
