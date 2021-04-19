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

import Auth from '../../utils/auth';
import DividerLine from '../DividerLine';
import { Link } from 'react-router-dom';
import TodoList from '../../pages/TodoList';
import { loginUser } from '../../utils/API';

const Login = () => {
	const [formState, setFormState] = useState({ name: '', password: '' });
	const [errorMsg, setErrorMsg] = useState(null);
	console.log('errorMsg:', errorMsg);

	const handleSubmit = async event => {
		event.preventDefault();

		try {
			const response = await loginUser(formState);
			console.log('response:', response);
			if (!response.ok) {
				setErrorMsg('Incorrect Name or Password.');
				throw new Error('Incorrect Name or Password.');
			}

			const { token } = await response.json();
			Auth.login(token);

			location.replace('/todos');
		} catch (err) {
			console.error(err);
		}

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
		<>
			{Auth.loggedIn() ? (
				<TodoList />
			) : (
				<section>
					<Heading as='h3' my='25px'>
						Login here!
					</Heading>
					<form onSubmit={handleSubmit}>
						<FormControl isRequired>
							<FormLabel htmlFor='name'>Your Name:</FormLabel>
							<Input
								size='lg'
								name='name'
								type='text'
								id='name'
								value={formState.name}
								onChange={handleChange}
							/>
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

							<div className='error-wrap'>
								<Button marginTop={5} type='submit' colorScheme='teal' size='lg'>
									Login
								</Button>
								{errorMsg && <span className='error-msg'>{errorMsg}</span>}
							</div>
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
			)}
		</>
	);
};

export default Login;
