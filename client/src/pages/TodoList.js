import React, { useEffect, useState } from 'react';
import { deleteTodo, getCurrentUser } from '../utils/API';

import Auth from '../utils/auth';
import { Button } from '@chakra-ui/react';
import DividerLine from '../components/DividerLine';
import { Link } from 'react-router-dom';
import Login from '../components/Login';
import Signup from './Signup';
import { capitalizeStr } from '../utils/helpers';

const TodoList = () => {
	const [userData, setUserData] = useState({});
	const todos = userData?.todos || {};

	// Function to delete a todo item
	const handleDelete = async event => {
		const token = Auth.loggedIn() ? Auth.getToken() : null;

		if (!token) {
			return false;
		}

		try {
			const response = await deleteTodo(todoID, token);

			if (!response.ok) {
				throw new Error('There was an error!');
			}
		} catch (err) {
			console.error(err);
		}
	};

	// Fetch the loggedin user's data by decoding the JWT from Auth
	useEffect(() => {
		const getUserData = async () => {
			try {
				const token = Auth.loggedIn() ? Auth.getToken() : null;

				if (!token) {
					return false;
				}

				const response = await getCurrentUser(token);

				if (!response.ok) {
					throw new Error('Something went wrong.');
				}

				const user = await response.json();
				setUserData(user);
			} catch (err) {
				console.error(err);
			}
		};
		getUserData();
	}, [todos.length]);

	if (userData.todoCount === 0) {
		return (
			<>
				<h2>Hi {capitalizeStr(userData.name)}!</h2>
				<p>You don't have any To-Do items yet... get on it!</p>
			</>
		);
	}

	if (!todos.length) {
		return Auth.loggedIn() ? <h2>Loading items...</h2> : <Signup />;
	}

	return (
		<main>
			{Auth.loggedIn() ? (
				<>
					<h2>{capitalizeStr(userData.name)}'s Current To-Do List</h2>
					<section>
						{todos.map(todoItem => (
							<div
								key={todoItem._id}
								id={`todo-${todoItem._id}`}
								className='card text-center todo-card'
							>
								<div className='card-body'>
									<h3 className='card-title item-title'>{todoItem.title}</h3>
									<p className='card-text item-desc'>{todoItem.description}</p>
									<p className='card-text text-muted item-level'>
										Priority Level: {capitalizeStr(todoItem.priority)}
									</p>
									<div>
										<Link to={`/edit/${todoItem._id}`}>
											<Button margin={3} colorScheme='teal' size='md'>
												Edit
											</Button>
										</Link>

										<Button
											onClick={handleDelete}
											margin={3}
											colorScheme={'red'}
											size='md'
										>
											Delete
										</Button>
									</div>
								</div>
								<div className='card-footer text-muted'>
									<span>Created on {todoItem.createdAt}</span>
								</div>
							</div>
						))}
					</section>
				</>
			) : (
				<>
					<section>
						<Login />
					</section>

					<DividerLine />

					<section>
						<p>Haven't joined yet?</p>
						<Link to='/signup'>Click here!</Link>
					</section>
				</>
			)}
		</main>
	);
};

export default TodoList;
