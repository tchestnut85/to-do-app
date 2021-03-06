import React, { useState } from 'react';

const CreateTodo = () => {
    const [todoState, setTodoState] = useState({
        description: '',
        priority: '',
        completed: false
    });

    const handleChange = event => {
        const { name, value } = event.target;

        setTodoState({
            ...todoState,
            [name]: value
        });
    };
    console.log(todoState);

    const handleSubmit = event => {
        event.preventDefault();

        setTodoState({
            description: '',
            priority: '',
            completed: false
        });
    };


    return (
        <main>
            <h2>Create New To-Do Item</h2>
            <section>
                <form onSubmit={handleSubmit}>
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