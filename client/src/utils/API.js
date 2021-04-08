// POST to create a user
export const createUser = userData => {
	return fetch('/api/users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(userData),
	});
};

// POST to login a user
export const loginUser = userData => {
	return fetch('/api/users/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(userData),
	});
};

// Request to get the current user's data
export const getCurrentUser = token => {
	return fetch('/api/users/me', {
		headers: {
			'Content-Type': 'application/json',
			authorization: `Bearer ${token}`,
		},
	});
};

// POST to create a ToDo item
export const saveTodo = (todoState, token) => {
	return fetch('/api/todos', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(todoState),
	});
};

export const getTodoItem = todoID => {
	return fetch(`/api/todos/${todoID}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			// Authorization: `Bearer ${token}`,
		},
	});
};

// Update/edit a todo item
export const editTodo = (todoState, todoID, token) => {
	return fetch(`/api/todos/${todoID}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(todoState),
	});
};

// Delete a todo item
export const deleteTodo = (todoID, token) => {
	return fetch(`/api/todos/${todoID}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});
};
