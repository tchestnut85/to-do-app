import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import { Link, Route, BrowserRouter as Router } from 'react-router-dom';

import CreateTodo from './components/CreateTodo';
import EditTodo from './components/EditTodo';
import TodoList from './components/TodoList';

// import logo from './logo.png';

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className='navbar-brand'><i className="fa-2x fas fa-clipboard-check"></i></div>
          <Link to='/' className='navbar-brand'><h1>To-Do List</h1></Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className='navbar-item'>
                <Link to='/' className='nav-link'>All Items</Link>
              </li>
              <li className="navbar-item">
                <Link to='/create' className='nav-link'>Create Item</Link>
              </li>
            </ul>
          </div>
        </nav>

        <br />

        <Route exact path='/' component={TodoList} />
        <Route exact path='/edit/:id' component={EditTodo} />
        <Route exact path='/create' component={CreateTodo} />
      </div>
    </Router>
  );
}

export default App;
