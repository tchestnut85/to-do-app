import { DELETE_TODO, GET_ALL_TODOS, GET_ONE_TODO } from './actions';

import { useReducer } from 'react';

export const reducer = (state, action) => {
	switch (action.type) {
		case GET_ALL_TODOS:
			return {
				...state,
				todos: action.payload.todos,
				_id: action.payload._id,
				name: action.payload.name,
				todoCount: action.payload.todoCount,
				createdAt: action.payload.createdAt,
			};
		case GET_ONE_TODO:
			return {
				...state,
				currentTodo: action.payload,
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
