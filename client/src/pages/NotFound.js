import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import React from 'react';

const NotFound = () => {
	return (
		<main>
			<h2>Not all those who wander are lost... unless you've come to this page.</h2>
			<Link to='/'>
				<Button margin={3} colorScheme='teal' size='md'>
					Head Back Home
				</Button>
			</Link>
		</main>
	);
};

export default NotFound;
