import Login from "./pages/Login";
import Signup from "./pages/Signup";

import PedalKnob from "./pages/PedalKnob";
import PedalUpdates from "./pages/PedalUpdates";
import HomePage from "./components/HomePage";
import MainTabs from "./components/MainTabs";
import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  HttpLink,
  concat,
} from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import authService from "./utils/auth";

  const authMiddleware = new ApolloLink((operation, forward) => {
    const token = authService.getToken();
    
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });

  return forward(operation);
});

const httpLink = new HttpLink({ uri: "/graphql" });

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    
      <ApolloProvider client={client}>
        <Router>
          
          <MainTabs>
          
            <Routes>
              <Route
                path="/HomePage"
                element={<HomePage />}/>
              <Route path="/"  />
              <Route path="/pedalupdates/:pedalsettingId" element={<PedalUpdates />} />
              <Route
                path="/pedalsetting/:pedalsettingId"
                element={<PedalKnob />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              <Route path="/logout"  />
              <Route path="*"  />
            </Routes>
            
          </MainTabs>
        </Router>
      </ApolloProvider>
    
  );
}

export default App;
