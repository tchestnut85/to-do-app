import React, { createContext, useContext } from 'react';

import { useTodoReducer } from './reducers';

const TodoContext = createContext();
const { Provider } = TodoContext;

const TodoProvider = ({ value = [], ...props }) => {
	const [state, dispatch] = useTodoReducer({
		// set the initial state
	});

	return <Provider value={[state, dispatch]} {...props} />;
};

const useTodoContext = () => {
	return useContext(TodoContext);
};

export { TodoProvider, useTodoContext };
