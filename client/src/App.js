import React from 'react';
import { ApolloProvider } from "@apollo/react-hooks";
import { StoreProvider } from "./utils/GlobalState";
import ApolloClient from 'apollo-boost';
import 'antd/dist/antd.css';

import Footer from "./components/Footer";
import Header from './components/Header';
import Listings from './components/Listings';
import CategoryMenu from './components/CategoryMenu';
import Profile from './pages/Profile';

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
          <Listings />
          <Profile />
        </StoreProvider>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
