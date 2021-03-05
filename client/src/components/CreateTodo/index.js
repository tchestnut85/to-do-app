import React, { useState } from 'react';

const CreateTodo = () => {
    const [todos, setTodos] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
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
                        />
                    </div>

                </form>
            </section>
        </main>
    );
};

export default CreateTodo;