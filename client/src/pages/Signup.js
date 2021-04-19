import {
	Button,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	Heading,
	Input,
} from '@chakra-ui/react';
import React, { useState } from 'react';

import Auth from '../utils/auth';
import DividerLine from '../components/DividerLine';
import { Link } from 'react-router-dom';
import { createUser } from '../utils/API';

const Signup = () => {
	const [formState, setFormState] = useState({ name: '', password: '' });
	const [errorMsg, setErrorMsg] = useState(null);
	console.log('errorMsg:', errorMsg);

	const handleSubmit = async event => {
		event.preventDefault();

		try {
			const response = await createUser(formState);
			console.log('response:', response);

			if (!response.ok) {
				setErrorMsg('There was an error when trying to sign up.');
				throw new Error('There was an error when trying to sign up.');
			}

			const { token } = await response.json();
			Auth.login(token);
			// location.replace('/todos');
		} catch (err) {
			console.error(err);
		}

		// setFormState({ name: '', password: '' });
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
				Don't have an account? Signup here!
			</Heading>
			<form onSubmit={handleSubmit}>
				<FormControl isRequired>
					<FormLabel htmlFor='name'>Your Name:</FormLabel>
					<Input
						size='lg'
						type='text'
						id='name'
						name='name'
						value={formState.name}
						onChange={handleChange}
					/>
					<FormHelperText>First Name, Nickname, whatever you prefer!</FormHelperText>

					<DividerLine />

					<FormLabel htmlFor='signupPassword'>Password:</FormLabel>
					<Input
						size='lg'
						type='password'
						id='signupPassword'
						name='password'
						value={formState.password}
						onChange={handleChange}
					/>
					<FormErrorMessage></FormErrorMessage>

					<div className='error-wrap'>
						<Button marginTop={5} type='submit' colorScheme='teal' size='lg'>
							Join
						</Button>
						{errorMsg && <span className='error-msg'>{errorMsg}</span>}
					</div>

					<DividerLine />
					<p>Have an account already?</p>
					<Link to='/'>
						<Button marginTop={5} colorScheme='purple' size='lg'>
							Login!
						</Button>
					</Link>
				</FormControl>
			</form>
		</section>
	);
};

export default Signup;
