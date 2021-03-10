import { Heading } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import React from 'react';

function Nav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className='navbar-brand'><i className="fa-2x fas fa-clipboard-check"></i></div>
            <Link to='/' className='navbar-brand'>
                <Heading as="h1" size="2xl">To-Do List</Heading>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggle" aria-controls="navbarToggle" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div id='navbarToggle' className="collapse navbar-collapse">
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