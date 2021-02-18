import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import { Link, Route, BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <main>
      <Router>
        <div>
          <h1>To-Do List</h1>
        </div>
        <Route exact path='/' component={TodoList} />
        <Route exact path='/edit/:id' component={EditTodo} />
        <Route exact path='/create' component={CreateTodo} />
      </Router>
    </main>
  );
}

export default App;
