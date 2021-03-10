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
import { createUser } from '../../utils/API';

function Signup() {

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
            const response = await createUser(formState);


            if (!response.ok) {
                throw new Error('There was an error when trying to sign up.');
            }

            console.log(response);

            Auth.login(response.token);

            // const {user, token} = await response.json();
            // Auth.login(token);

        } catch (err) {
            console.error(err);
        }

        setFormState({ name: '', password: '' });
    };

    return (
        <section>
            <Heading as='h3' my='25px'>Don't have an account? Signup here!</Heading>
            <FormControl
                isRequired
                onSubmit={handleSubmit}
            >
                <FormLabel htmlFor='name'>Your Name:</FormLabel>
                <Input size='lg' type='text' id='name' />
                <FormHelperText>First Name, Nickname, whatever you prefer!</FormHelperText>

                <Center height='50px'>
                    <Divider orientation="horizontal" />
                </Center>

                <FormLabel htmlFor='password'>Password:</FormLabel>
                <Input size='lg' type='password' id='password' />
                <FormHelperText>Shhh... Don't share!</FormHelperText>
                <FormErrorMessage></FormErrorMessage>
            </FormControl>
        </section>
    );
}

export default Signup;