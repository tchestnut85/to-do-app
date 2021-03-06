import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";

import { Link, Route, BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

import CreateTodo from './components/CreateTodo';
import EditTodo from './components/EditTodo';
import Nav from './components/Nav';
import React from 'react';
import TodoList from './components/TodoList';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Nav />
        <div className="container">
          <Route exact path='/' component={TodoList} />
          <Route exact path='/edit/:id' component={EditTodo} />
          <Route exact path='/create' component={CreateTodo} />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
