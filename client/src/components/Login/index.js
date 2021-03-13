import {
    Button,
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
import { loginUser } from '../../utils/API';

function Login() {

    const [formState, setFormState] = useState({ name: '', password: '' });

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await loginUser(formState);

            if (!response.ok) {
                throw new Error('There was an error trying to log in.');
            }
            const { user, token } = await response.json();

            Auth.login(token);
        } catch (err) {
            console.error(err);
        }

        setFormState({ name: '', password: '' });
        location.replace('/todos');
    };

    // Update the form's input state
    const handleChange = event => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value
        });
    };
    console.log('formstate', formState);

    return (
        <section>
            <Heading as='h3' my='25px'>Login here!</Heading>
            <form onSubmit={handleSubmit}>
                <FormControl isRequired>
                    <FormLabel htmlFor='name'>Your Name:</FormLabel>
                    <Input size='lg' name='name' type='text' id='name' value={formState.name} onChange={handleChange} />
                    <FormHelperText>First Name, Nickname, whatever you prefer!</FormHelperText>

                    <Center height='50px'>
                        <Divider orientation="horizontal" />
                    </Center>

                    <FormLabel htmlFor='loginPassword'>Password:</FormLabel>
                    <Input size='lg' name='password' type='password' id='loginPassword' value={formState.password} onChange={handleChange} />
                    <FormHelperText>Shhh... Don't share!</FormHelperText>
                    <FormErrorMessage></FormErrorMessage>
                    <Button type='submit' colorScheme="teal" size="lg">
                        Login
                </Button>
                </FormControl>
            </form>
        </section>
    );
}

export default Login;