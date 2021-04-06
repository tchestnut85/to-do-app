import { Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input } from '@chakra-ui/react';
import React, { useState } from 'react';

import Auth from '../../utils/auth';
import DividerLine from '../DividerLine';
import { Link } from 'react-router-dom';
import { loginUser } from '../../utils/API';

const Login = () => {
	const [formState, setFormState] = useState({ name: '', password: '' });

	const handleSubmit = async event => {
		event.preventDefault();

		try {
			const response = await loginUser(formState);

			if (!response.ok) {
				throw new Error('Incorrect Name or Password.');
			}
			const { user, token } = await response.json();

			Auth.login(token);
		} catch (err) {
			console.error(err);
		}

		location.replace('/todos');
		setFormState({ name: '', password: '' });
	};

	// Update the form's input state
	const handleChange = event => {
		const { name, value } = event.target;

		setFormState({
			...formState,
			[name]: value,
		});
	};

	return (
		<section>
			<Heading as='h3' my='25px'>
				Login here!
			</Heading>
			<form onSubmit={handleSubmit}>
				<FormControl isRequired>
					<FormLabel htmlFor='name'>Your Name:</FormLabel>
					<Input size='lg' name='name' type='text' id='name' value={formState.name} onChange={handleChange} />
					<FormHelperText>First Name, Nickname, whatever you prefer!</FormHelperText>

					<DividerLine />

					<FormLabel htmlFor='loginPassword'>Password:</FormLabel>
					<Input
						size='lg'
						name='password'
						type='password'
						id='loginPassword'
						value={formState.password}
						onChange={handleChange}
					/>
					<FormErrorMessage></FormErrorMessage>
					<Button marginTop={5} type='submit' colorScheme='teal' size='lg'>
						Login
					</Button>
				</FormControl>
			</form>

			<DividerLine />

			<div>
				<p>Haven't joined yet?</p>
				<Link to='/signup'>
					<Button marginTop={5} colorScheme='purple' size='lg'>
						Click here!
					</Button>
				</Link>
			</div>
		</section>
	);
};

export default Login;
