import { type ChangeEvent, useState } from 'react';
import { ActionIcon, TextInput, Button, Checkbox, Group, Card, PasswordInput } from '@mantine/core';
import { FaSquarePlus } from 'react-icons/fa6';
import './AuthPage.css';
import { useForm } from '@mantine/form';
import { Link, Outlet } from 'react-router';

export const AuthLayout = () => {
  return (
    <div className="authCardContainer">
      <Card className="authCard" shadow="sm" padding="xl" radius="md" withBorder>
        <Outlet />
      </Card>
    </div>
  )
}

