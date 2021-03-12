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

import Auth from '../utils/auth';
import { createUser } from '../utils/API';

function Signup() {

    const [formState, setFormState] = useState({ name: '', password: '' });

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await createUser(formState);

            if (!response.ok) {
                throw new Error('There was an error when trying to sign up.');
            }

            const { user, token } = await response.json();
            Auth.login(token);
        } catch (err) {
            console.error(err);
        }

        setFormState({ name: '', password: '' });
        location.replace('/');
    };

    // Update the form's input state
    const handleChange = event => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value
        });
    };
    console.log(formState);

    return (
        <section>
            <Heading as='h3' my='25px'>Don't have an account? Signup here!</Heading>
            <form onSubmit={handleSubmit}>
                <FormControl isRequired>
                    <FormLabel htmlFor='name'>Your Name:</FormLabel>
                    <Input size='lg' type='text' id='name' name='name' value={formState.name} onChange={handleChange} />
                    <FormHelperText>First Name, Nickname, whatever you prefer!</FormHelperText>

                    <Center height='50px'>
                        <Divider orientation="horizontal" />
                    </Center>

                    <FormLabel htmlFor='signupPassword'>Password:</FormLabel>
                    <Input size='lg' type='password' id='signupPassword' name='password' value={formState.password} onChange={handleChange} />
                    <FormHelperText>Shhh... Don't share!</FormHelperText>
                    <FormErrorMessage></FormErrorMessage>

                    <Button type='submit' colorScheme="teal" size="lg">
                        Join
                    </Button>
                </FormControl>
            </form>
        </section>
    );
}

export default Signup;