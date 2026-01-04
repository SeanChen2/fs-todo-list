import { type ChangeEvent, useState } from 'react';
import { ActionIcon, TextInput, Button, Checkbox, Group, Card, PasswordInput } from '@mantine/core';
import { FaSquarePlus } from 'react-icons/fa6';
import './AuthPage.css';
import { useForm } from '@mantine/form';
import { Link, Form, useSubmit } from 'react-router';

export const RegisterPage = () => {
  const submit = useSubmit();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      email: '',
      password: '',
      termsOfService: false,
    },

    validate: {
      name: (value) => (value ? null : "Name is required"),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value ? null : "Password is required"),
    },
  });

  return (
    <Form onSubmit={form.onSubmit(values => {
      submit(values, {
        method: "post",
        action: "/register",
      })
    })}>
      <div className='headerContainer'>
        <div className='loginHeader'>
          <h2>Sign up</h2>
          <p>
            Already have an account?
            <Link to="/login"> Sign in.</Link>
          </p>
        </div>
      </div>

      <TextInput
        withAsterisk
        mt="md"
        label="Full name"
        placeholder="John Doe"
        name="name"
        key={form.key('name')}
        {...form.getInputProps('name')}
      />

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
        placeholder="Create your password"
        name="password"
        key={form.key('password')}
        {...form.getInputProps('password')}
      />

      <Group className="submitContainer" mt="lg">
        <Button type="submit">Register</Button>
      </Group>
    </Form>
  )
}

