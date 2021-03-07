import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { ApolloProvider } from '@apollo/client'
import { Provider } from 'react-redux'
import { ChakraProvider } from "@chakra-ui/react"
import Pages from '~/pages'
import client from '~/client'
import store from '~/store'


const App: React.FC = () => <ChakraProvider>
  <Provider store={store}>
    <ApolloProvider // @ts-ignore 
      client={client}>
      <Router>
        <Switch>
          <Route exact path="/" component={Pages.Home} />
          <Route path="/sign-up" component={Pages.SignUp} />
          <Route path="/login" component={Pages.LogIn} />
        </Switch>
      </Router >
    </ApolloProvider >
  </Provider >
</ChakraProvider>

export default App