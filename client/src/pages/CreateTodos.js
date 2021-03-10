import React, { useState } from 'react';

import Auth from '../utils/auth';
import { Redirect } from 'react-router-dom';
import { saveTodo } from '../utils/API';

const CreateTodo = () => {
    const [todoState, setTodoState] = useState({
        title: '',
        description: '',
        priority: '',
        completed: false
    });

    // Function to update the todo state from the form input
    const handleChange = event => {
        const { name, value } = event.target;

        setTodoState({
            ...todoState,
            [name]: value
        });
    };

    // TODO - Update the saveTodo and handleSubmit functions to use 'useMutation' hook from React-Query package
    // docs reference: https://react-query.tanstack.com/guides/invalidations-from-mutations
    // example: https://blog.bitsrc.io/how-to-start-using-react-query-4869e3d5680d

    // Submit the form data and call the saveTodo function, then reset the todo state
    const handleSubmit = async (event, todoState) => {
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
            console.log(response);
        } catch (err) {
            console.error(err);
        }

        setTodoState({
            title: '',
            description: '',
            priority: '',
            completed: false
        });

        location.replace('/');
    };

    return (
        <main>
            <h2>Create New To-Do Item</h2>
            <section>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            className="form-control"
                            id='title'
                            name='title'
                            value={todoState.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <input
                            type="text"
                            className="form-control"
                            id='description'
                            name='description'
                            value={todoState.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input
                                type="radio"
                                className="form-check-input"
                                id='priority-low'
                                name='priority'
                                value='low'
                                checked={setTodoState.priority === 'low'}
                                onChange={handleChange}
                            />
                            <label className='form-check-label' htmlFor="priority-low">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                type="radio"
                                className="form-check-input"
                                id='priority-medium'
                                name='priority'
                                value='medium'
                                checked={setTodoState.priority === 'medium'}
                                onChange={handleChange}
                            />
                            <label className='form-check-label' htmlFor="priority-medium">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                type="radio"
                                className="form-check-input"
                                id='priority-high'
                                name='priority'
                                value='high'
                                checked={setTodoState.priority === 'high'}
                                onChange={handleChange}
                            />
                            <label className='form-check-label' htmlFor="priority-high">High</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <button type="submit" className='btn btn-info'>Save To-Do!</button>
                    </div>
                </form>
            </section>
        </main>
    );
};

export default CreateTodo;