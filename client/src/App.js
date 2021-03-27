import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import CreateTodo from './pages/CreateTodos';
import EditTodo from './pages/EditTodos';
import Login from './components/Login';
import Nav from './components/Nav';
import React from 'react';
import Signup from './pages/Signup';
import TodoList from './pages/TodoList';

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<div className='container'>
					<Nav />
					<Switch>
						<Route exact path='/' component={Login} />
						<Route exact path='/signup' component={Signup} />
						<Route exact path='/todos' component={TodoList} />
						<Route exact path='/edit/:id' component={EditTodo} />
						<Route exact path='/create' component={CreateTodo} />
					</Switch>
				</div>
			</Router>
		</QueryClientProvider>
	);
}

export default App;
