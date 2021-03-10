import {
    Center,
    Divider,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Heading,
    Input
} from "@chakra-ui/react";
import React, { useState } from 'react';

import Auth from '../../utils/auth';

function Login() {

    const [formState, setFormState] = useState({ name: '', password: '' });

    // Update the form's input state
    const handleChange = event => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value
        });
    };

    const handleSubmit = async (event, formState) => {
        event.preventDefault();

        try {
            const response = await loginUser(formState);

            if (!response.ok) {
                throw new Error('There was an error trying to log in.');
            }
            console.log(response);
            Auth.login(response.token);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <section>
            <Heading as='h3' my='25px'>Login here!</Heading>
            <FormControl
                onSubmit={handleSubmit}
                isRequired
            >
                <FormLabel htmlFor='name'>Your Name:</FormLabel>
                <Input size='lg' type='text' id='name' />
                <FormHelperText>First Name, Nickname, whatever you prefer!</FormHelperText>
            </FormControl>

            <Center height='50px'>
                <Divider orientation="horizontal" />
            </Center>

            <FormControl isRequired>
                <FormLabel htmlFor='password'>Password:</FormLabel>
                <Input size='lg' type='password' id='password' />
                <FormHelperText>Shhh... Don't share!</FormHelperText>
                <FormErrorMessage></FormErrorMessage>
            </FormControl>
        </section>
    );
}

export default Login;