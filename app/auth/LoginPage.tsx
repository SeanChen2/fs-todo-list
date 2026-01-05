import { type ChangeEvent, useState, useEffect } from 'react';
import { ActionIcon, TextInput, Button, Checkbox, Group, Card, PasswordInput, Text } from '@mantine/core';
import { FaSquarePlus } from 'react-icons/fa6';
import './AuthPage.css';
import { useForm } from '@mantine/form';
import { Form, Link, useSubmit, useActionData } from 'react-router';

type ActionData = {
  fieldErrors?: {
    email?: string;
    password?: string;
  };
  formError?: string;
};

export const LoginPage = () => {
  const submit = useSubmit();
  const actionData = useActionData<ActionData>();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value ? null : 'Password is required'),
    },
  });

  useEffect(() => {
    if (actionData?.fieldErrors) {
      form.setErrors(actionData.fieldErrors);
    }
  }, [actionData]);

  return (
    <Form onSubmit={form.onSubmit(values => {
      submit(values, {
        method: "post",
        action: "/login",
      });
    })}>
      <div className='headerContainer'>
        <div className='loginHeader'>
          <h2>Sign in</h2>
          <p>
            Don't have an account?
            <Link to="/register"> Sign up.</Link>
          </p>
        </div>
      </div>

      <TextInput
        withAsterisk
        mt="md"
        label="Email"
        placeholder="example@email.com"
        name="email"
        key={form.key('email')}
        {...form.getInputProps('email')}
      />

      <PasswordInput
        withAsterisk
        mt="md"
        label="Password"
        placeholder="Enter your password"
        name="password"
        key={form.key('password')}
        {...form.getInputProps('password')}
      />

      {actionData?.formError && (
        <Text className='errorMessage' c="red">{actionData.formError}</Text>
      )}

      <Group className="submitContainer" mt="lg">
        <Button type="submit">Login</Button>
      </Group>
    </Form>
  )
}

