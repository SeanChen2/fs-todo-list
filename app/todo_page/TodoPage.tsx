import { type ChangeEvent, useState } from 'react';
import { ActionIcon, TextInput, Button } from '@mantine/core';
import { FaSquarePlus } from 'react-icons/fa6';
import './TodoPage.css';
import { type Task } from './Interfaces';
import TodoTask from './TodoTask';
import { useLoaderData, Form } from 'react-router';
import type { loader } from '~/routes/home';
import { MdEdit } from 'react-icons/md';
import { ProfileMenu } from './ProfileMenu';

export const TodoPage = () => {
  const { user, todoList } = useLoaderData<typeof loader>();
  const [taskName, setTaskName] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "newTask") {
      setTaskName(event.target.value);
    }
  };
  
  return (
    <div className='app'>
      <div className='profileMenuContainer'>
        <ProfileMenu name={user.name}/>
      </div>

      <div className='header'>
        <h1>Welcome back, {user.name}.</h1>
        What's on your to-do list today?
      </div>
      
      <Form className='newTaskForm' method="post" onSubmit={() => setTaskName("")}>
        <TextInput 
          placeholder="Add a task..." 
          size="md" 
          name="newTask"
          value={taskName}
          onChange={handleInputChange}
        />
        <Button 
          type="submit" 
          aria-label="Add" 
          size="md"
          name="actionType"
          value="add" // This form adds a task
        > 
          +
        </Button>
      </Form>

      <div className='todo-list'>
        {todoList.map((task: Task, key: number) => {
          return <TodoTask task={task} key={key}/>;
        })}
      </div>
    </div>
  )
}