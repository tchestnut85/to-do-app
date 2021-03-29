import {
	Button,
	Center,
	Divider,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Radio,
	RadioGroup,
	Switch,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { editTodo, getTodoItem } from '../utils/API';

import Auth from '../utils/auth';
import DividerLine from '../components/DividerLine';
import { useParams } from 'react-router-dom';

function EditTodo() {
	// Get the Todo ID from the parameters
	const { id: todoID } = useParams();
	console.log({ todoID });

	// Keep track of the completed property from the ChakraUI switch
	const [isCompleted, setIsCompleted] = useState('');

	// Keep track on the priorityLevel so ChakraUI's FormState works with to todoState below
	const [priorityLevel, setPriorityLevel] = useState('');

	const [todoState, setTodoState] = useState({
		title: '',
		description: '',
		priority: priorityLevel,
		completed: false,
		userId: '',
	});
	console.log(todoState);

	// ToDo - need to setup the handlesubmit function
	const handleSubmit = async event => {
		event.preventDefault();

		const token = Auth.loggedIn() ? Auth.getToken() : null;

		if (!token) {
			return false;
		}

		try {
			const response = await editTodo(todoState, todoID, token);
			if (!response) {
				throw new Error('There was an error.');
			}
			// location.assign('/todos');
		} catch (err) {
			console.error(err);
		}
	};

	const handleChange = event => {
		const { name, value } = event.target;
		console.log(name, value);
		setTodoState({
			...todoState,
			priority: priorityLevel,
			[name]: value,
		});
	};

	useEffect(() => {
		const getTodo = async () => {
			try {
				const token = Auth.loggedIn() ? Auth.getToken() : null;
				if (!token) {
					return false;
				}
				const response = await getTodoItem(todoID);
				const todoData = await response.json();
				console.log(todoData);
				setTodoState(todoData);
			} catch (err) {
				console.error(err);
			}
		};
		getTodo();
	}, []);

	return (
		<main>
			<h2>Edit This To-Do List Item</h2>
			<section>
				<form onSubmit={handleSubmit}>
					<FormControl>
						<FormLabel htmlFor='title'>Title:</FormLabel>
						<Input
							type='text'
							className='form-control'
							id='title'
							name='title'
							value={todoState.title}
							onChange={handleChange}
						/>

						<DividerLine />

						<FormLabel htmlFor='description'>Description:</FormLabel>
						<Input
							type='text'
							className='form-control'
							id='description'
							name='description'
							value={todoState.description}
							onChange={handleChange}
						/>

						<DividerLine />

						<FormLabel htmlFor='priority'>Priority:</FormLabel>
						<RadioGroup
							id='priority'
							name='priority'
							defaultValue={todoState.priority}
							onChange={setPriorityLevel}
							onClick={handleChange}
							direction='row'
						>
							<Radio name='priority' padding={4} value='low' colorScheme='cyan'>
								Low
							</Radio>
							<Radio name='priority' padding={4} value='medium' colorScheme='teal'>
								Medium
							</Radio>
							<Radio name='priority' padding={4} value='high' colorScheme='purple'>
								High
							</Radio>
						</RadioGroup>

						<DividerLine />

						<div>
							<p>Mark this item complete?</p>
							<Switch
								id='complete'
								colorScheme='purple'
								size='lg'
								defaultChecked={todoState.completed}
								onClick={setIsCompleted}
								// onClick={setTodoState}
								isChecked={isCompleted}
								value={todoState.completed}
							/>
						</div>

						<DividerLine />

						<Button type='submit' colorScheme='teal' size='lg'>
							Update!
						</Button>
						<FormErrorMessage></FormErrorMessage>
					</FormControl>
				</form>
			</section>
		</main>
	);
}

export default EditTodo;
