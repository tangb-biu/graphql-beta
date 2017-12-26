import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import fetch from  'isomorphic-fetch';

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
    link: new HttpLink({ uri: 'http://localhost:8888/graphql', fetch: fetch, headers: {accept: 'applicaion/json'}}),
    cache: new InMemoryCache()
})


ReactDOM.render( 
    <ApolloProvider client={ client }>
        <App/>
    </ApolloProvider>,
    document.getElementById('root'));
registerServiceWorker();