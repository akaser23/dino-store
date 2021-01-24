import React from 'react';
import { ApolloProvider } from "@apollo/react-hooks";
import { StoreProvider } from "./utils/GlobalState";
import ApolloClient from 'apollo-boost';

import Footer from "./components/Footer";
import Header from './components/Header';
import ProductList from './components/Listings';
import CategoryMenu from './components/CategoryMenu';

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  uri: '/graphql',
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Header />
        <StoreProvider>
        <CategoryMenu />
          <ProductList />
        </StoreProvider>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
