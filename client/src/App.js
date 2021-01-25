import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { StoreProvider } from "./utils/GlobalState";
import ApolloClient from 'apollo-boost';

import Footer from "./components/Footer";
import Header from './components/Header';
// import Listings from './components/Listings';
// import CategoryMenu from './components/CategoryMenu';
import Profile from './pages/Profile';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

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
      <Router>
        <div className="App">
          <Header />
          <StoreProvider>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/Signup" component={Signup} />
              <Route exact path="/Profile" component={Profile} />
            </Switch>
          </StoreProvider>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
