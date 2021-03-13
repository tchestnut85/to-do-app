// POST route to create a user
export const createUser = (userData) => {
    return fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    });
};

// POST route to login a user
export const loginUser = (userData) => {
    console.log(userData);
    return fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    });
};

// POST Route to create a ToDo item
export const saveTodo = (todoState, token) => {
    return fetch('/api/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(todoState)
    });
};

// Get route to get the current user's todo items
export const getCurrentUser = (token) => {
    return fetch('/api/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },

    });
};