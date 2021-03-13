import { Button, Heading } from "@chakra-ui/react";

import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import React from 'react';

function Nav() {

    const logout = event => {
        event.preventDefault();
        Auth.logout();
    };

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
                    {Auth.loggedIn() ? (
                        <>
                            <li className='navbar-item'>
                                <Link to='/todos' className='nav-link'>All Items</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to='/create' className='nav-link'>Create Item</Link>
                            </li>
                            <li className="navbar-item">
                                <Button
                                    onClick={logout}
                                    className='nav-link'
                                >
                                    Logout
                        </Button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to='/' className='nav-link'>Join!</Link>
                            </li>
                            <li>
                                <Link to='/login' className='nav-link'>Login!</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Nav;