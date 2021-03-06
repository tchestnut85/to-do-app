import { Link } from 'react-router-dom';
import React from 'react';

function Nav() {
    return (
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
    );
}

export default Nav;