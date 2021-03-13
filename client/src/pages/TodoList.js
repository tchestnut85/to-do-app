import { Center, Divider } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import Auth from '../utils/auth';
import { Link } from 'react-router-dom';
import Login from '../components/Login';
import { capitalizeStr } from '../utils/helpers';
import { getCurrentUser } from '../utils/API';
import { useQuery } from 'react-query';

// query for the todo list
// map through the todo list and display the description and priority and created date

const TodoList = () => {
    const [userData, setUserData] = useState({});
    const todos = userData?.todos || {};
    const todoLength = todos.length;

    // const { isLoading, error, data } = useQuery(
    //     'todoData', () =>
    //     fetch('/api/todos/').then(res => res.json())
    // );

    // if (isLoading) {
    //     return <h2>Loading To-Do List...</h2>;
    // }

    // if (error) {
    //     console.error('There was an error:', error.message);
    // }

    useEffect(() => {
        const getUser = async () => {
            try {
                const token = Auth.loggedIn ? Auth.getToken() : null;
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
        getUser();
    }, []);

    console.log(userData);

    if (!todoLength) {
        return <h2>Loading To-Do List...</h2>;
    };

    return (
        <main>
            {Auth.loggedIn() ?
                <>
                    <h2>Current To-Do List</h2>
                    <section>
                        {todos.map(todoItem => (
                            <div
                                key={todoItem.id}
                                className='card text-center todo-card'>
                                <div className="card-body">
                                    <h3 className='card-title'>{todoItem.title}</h3>
                                    <p className='card-text'>{todoItem.description}</p>
                                    <p className='card-text text-muted'>Priority Level: {capitalizeStr(todoItem.priority)}</p>
                                    <div>
                                        <Link
                                            to='/edit/:id'
                                            className='btn btn-info'>Edit</Link>
                                        <button className='btn btn-danger'>Delete</button>
                                    </div>
                                </div>
                                <div className='card-footer text-muted'>
                                    <span>Created on {todoItem.createdAt}</span>
                                </div>
                            </div>
                        ))}
                    </section>
                </>
                :
                <>
                    <section>
                        <Login />
                    </section>

                    <Center height='100px'>
                        <Divider orientation="horizontal" />
                    </Center>

                    <section>
                        <p>
                            Haven't joined yet?
                        </p>
                        <Link to='/'>Click here!</Link>
                    </section>
                </>
            }
        </main >
    );
};

export default TodoList;