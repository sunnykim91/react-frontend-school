import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory;';

const cache = new InMemoryCache();
const GITHUB_BASE_URL = 'https://api.github.com/graphql';
const client = new ApolloClient({
  uri: GITHUB_BASE_URL,
  request: operation => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${process.env.REACT_APP_GITHUB_API_TOKEN}`
      }
    });
  },
  cache
});

return <ApolloProvider client={client}>...</ApolloProvider>;
