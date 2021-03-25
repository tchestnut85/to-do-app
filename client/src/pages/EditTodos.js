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
	Stack,
} from '@chakra-ui/react';
import React, { useState } from 'react';

import { useParams } from 'react-router-dom';

const EditTodo = () => {
	// Todo - query for the to-do item to edit using the useParams hook and use that data to populate the values of the form input elements

	const [todoState, setTodoState] = useState({
		title: '',
		description: '',
		priority: '',
		completed: false,
		userId: '',
	});

	const [priorityLevel, setPriorityLevel] = useState('');

	// ToDo - need to setup the handlesubmit function
	const handleSubmit = {};

	const handleChange = event => {
		const { name, value } = event.target;
		console.log(name, value);
		setTodoState({
			...todoState,
			priority: priorityLevel,
			[name]: value,
		});
	};
	console.log(todoState);

	return (
		<main>
			<h2>Edit This To-Do List Item</h2>
			<section>
				<form
				// onSubmit={handleSubmit}
				>
					<FormControl action=''>
						<FormLabel htmlFor='title'>Title:</FormLabel>
						<Input
							type='text'
							className='form-control'
							id='title'
							name='title'
							value={todoState.title}
							onChange={handleChange}
						/>

						<Center height='50px'>
							<Divider orientation='horizontal' />
						</Center>

						<FormLabel htmlFor='description'>Description:</FormLabel>
						<Input
							type='text'
							className='form-control'
							id='description'
							name='description'
							value={todoState.description}
							onChange={handleChange}
						/>

						<Center height='50px'>
							<Divider orientation='horizontal' />
						</Center>

						<FormLabel htmlFor='priority'>Priority:</FormLabel>
						<RadioGroup
							id='priority'
							name='priority'
							defaultValue={todoState.priority}
							onChange={setPriorityLevel}
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

						<FormErrorMessage></FormErrorMessage>
						<Button type='submit' colorScheme='teal' size='lg'>
							Update!
						</Button>
					</FormControl>
				</form>
			</section>
		</main>
	);
};

export default EditTodo;
