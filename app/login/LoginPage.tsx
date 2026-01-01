import { type ChangeEvent, useState } from 'react';
import { ActionIcon, TextInput, Button, Checkbox, Group, Card, PasswordInput } from '@mantine/core';
import { FaSquarePlus } from 'react-icons/fa6';
import './LoginPage.css';
import { useForm } from '@mantine/form';

export const LoginPage = () => {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <div className="cardContainer">
      <Card className="loginCard" shadow="sm" padding="lg" radius="md" withBorder>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <Group className='header'>
            <h1>Login</h1>
          </Group>

          <TextInput
            withAsterisk
            mt="md"
            label="Email"
            placeholder="your@email.com"
            key={form.key('email')}
            {...form.getInputProps('email')}
          />

          <PasswordInput
            withAsterisk
            mt="md"
            label="Password"
            placeholder="Enter your password"
            key={form.key('password')}
            {...form.getInputProps('password')}
          />

          <Checkbox
            mt="md"
            label="I agree to sell my privacy"
            key={form.key('termsOfService')}
            {...form.getInputProps('termsOfService', { type: 'checkbox' })}
          />

          <Group className="submitContainer">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Card>
    </div>
  )
}

