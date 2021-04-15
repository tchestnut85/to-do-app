import { Button, Heading } from '@chakra-ui/react';

import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import React from 'react';

const Nav = ({ currentPage, setCurrentPage }) => {
	const logout = event => {
		event.preventDefault();
		Auth.logout();
	};

	return (
		<nav className='nav'>
			<div className='navbar-brand'>
				<i className='fa-2x fas fa-clipboard-check'></i>
			</div>
			<Link to='/' className='navbar-brand '>
				<Heading className='nav-title' as='h1' size='2xl' onClick={() => setCurrentPage('/todos')}>
					To-Do List
				</Heading>
			</Link>
			<ul className='navbar-items'>
				{Auth.loggedIn() ? (
					<>
						<li className={currentPage === '/todos' ? 'nav-item active' : 'nav-item'}>
							<Link to='/todos'>
								<Button onClick={() => setCurrentPage('/todos')} colorScheme={'telegram'}>
									All Items
								</Button>
							</Link>
						</li>
						<li className={currentPage === '/create' ? 'nav-item active' : 'nav-item'}>
							<Link to='/create'>
								<Button onClick={() => setCurrentPage('/create')} colorScheme={'telegram'}>
									Create Item
								</Button>
							</Link>
						</li>
						<li className='nav-item'>
							<Button onClick={logout} colorScheme={'purple'}>
								Logout
							</Button>
						</li>
					</>
				) : (
					<>
						<li>
							<Link to='/signup' className='nav-item'>
								<Button colorScheme={'teal'}>Join!</Button>
							</Link>
						</li>
						<li>
							<Link to='/' className='nav-item'>
								<Button colorScheme={'teal'}>Login!</Button>
							</Link>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
};

export default Nav;
