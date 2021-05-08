import { CREATE_TODO, DELETE_TODO, EDIT_TODO, GET_ALL_TODOS, GET_ONE_TODO } from './actions';

import { useReducer } from 'react';

export const reducer = (state, action) => {
	switch (action.type) {
		case CREATE_TODO:
			return {
				...state,
				// add the new todo item
			};
		case EDIT_TODO:
			return {
				...state,
				// add the updated todo item
			};
		case GET_ALL_TODOS:
			return action.payload;
		case GET_ONE_TODO:
			return {
				...state,
				// add the single todo item
			};

		case DELETE_TODO:
			const updatedTodos = state.todos.filter(todo => todo._id !== action.payload);
			return {
				...state,
				todoCount: updatedTodos.length,
				todos: [...updatedTodos],
			};
	}
};

export function useTodoReducer(initialState) {
	return useReducer(reducer, initialState);
}
