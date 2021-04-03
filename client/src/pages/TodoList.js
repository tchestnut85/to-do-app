import React, { useEffect, useState } from 'react';

import Auth from '../utils/auth';
import { Button } from '@chakra-ui/react';
import DividerLine from '../components/DividerLine';
import { Link } from 'react-router-dom';
import Login from '../components/Login';
import { capitalizeStr } from '../utils/helpers';
import { getCurrentUser } from '../utils/API';

const TodoList = () => {
	const [userData, setUserData] = useState({});
	const todos = userData?.todos || {};

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
		return <h2>Loading items...</h2>;
	}

	return (
		<main>
			{Auth.loggedIn() ? (
				<>
					<h2>{capitalizeStr(userData.name)}'s Current To-Do List</h2>
					<section>
						{todos.map(todoItem => (
							<div key={todoItem._id} id={`todo-${todoItem._id}`} className='card text-center todo-card'>
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

										<Button margin={3} colorScheme={'red'} size='md'>
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
