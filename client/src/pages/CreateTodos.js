import React, { useState } from 'react';

import Auth from '../utils/auth';
import { saveTodo } from '../utils/API';

const CreateTodo = () => {
	const [todoState, setTodoState] = useState({
		title: '',
		description: '',
		priority: '',
		completed: false,
		userId: '',
	});

	// Grab the current user's ID by decoding the JWT with the getProfile function from Auth
	const userId = Auth.getProfile().data._id;

	// Function to update the current todo state from the form input
	const handleChange = event => {
		const { name, value } = event.target;
		setTodoState({
			...todoState,
			userId: userId,
			[name]: value,
		});
	};

	// Submit the form data and call the saveTodo function, then reset the todo state
	const handleSubmit = async event => {
		event.preventDefault();

		// Get the logged in user's token
		const token = Auth.loggedIn() ? Auth.getToken() : null;

		if (!token) {
			return false;
		}

		try {
			const response = await saveTodo(todoState, token);

			if (!response.ok) {
				throw new Error('There was an error.');
			}

			location.assign('/todos');
		} catch (err) {
			console.error(err);
		}

		setTodoState({
			title: '',
			description: '',
			priority: '',
			completed: false,
			userId: userId,
		});
	};

	return (
		<main>
			<h2>Create New To-Do Item</h2>
			<section>
				<form onSubmit={handleSubmit}>
					<div className='form-group'>
						<label htmlFor='title'>Title:</label>
						<input
							type='text'
							className='form-control'
							id='title'
							name='title'
							value={todoState.title}
							onChange={handleChange}
						/>
					</div>

					<div className='form-group'>
						<label htmlFor='description'>Description:</label>
						<input
							type='text'
							className='form-control'
							id='description'
							name='description'
							value={todoState.description}
							onChange={handleChange}
						/>
					</div>

					<div className='form-group'>
						<div className='form-check form-check-inline'>
							<input
								type='radio'
								className='form-check-input'
								id='priority-low'
								name='priority'
								value='low'
								onChange={handleChange}
							/>
							<label className='form-check-label' htmlFor='priority-low'>
								Low
							</label>
						</div>
						<div className='form-check form-check-inline'>
							<input
								type='radio'
								className='form-check-input'
								id='priority-medium'
								name='priority'
								value='medium'
								onChange={handleChange}
							/>
							<label className='form-check-label' htmlFor='priority-medium'>
								Medium
							</label>
						</div>
						<div className='form-check form-check-inline'>
							<input
								type='radio'
								className='form-check-input'
								id='priority-high'
								name='priority'
								value='high'
								onChange={handleChange}
							/>
							<label className='form-check-label' htmlFor='priority-high'>
								High
							</label>
						</div>
					</div>

					<div className='form-group'>
						<button type='submit' className='btn btn-info'>
							Save To-Do!
						</button>
					</div>
				</form>
			</section>
		</main>
	);
};

export default CreateTodo;
