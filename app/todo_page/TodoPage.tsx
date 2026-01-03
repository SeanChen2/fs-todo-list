import { type ChangeEvent, useState } from 'react';
import { ActionIcon, TextInput, Button } from '@mantine/core';
import { FaSquarePlus } from 'react-icons/fa6';
import './TodoPage.css';
import { type Task } from './Interfaces';
import TodoTask from './TodoTask';
import { useLoaderData, Form } from 'react-router';

export const TodoPage = () => {
  const { todoList } = useLoaderData<{ todoList: Task[] }>();
  const [taskName, setTaskName] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "newTask") {
      setTaskName(event.target.value);
    }
  };

  // const addTask = (e: React.FormEvent<HTMLFormElement>): void => {
  //   e.preventDefault();
  //   if (taskName === "") return;

  //   const newTask = {id: todoList.length, name: taskName, completed: false}
  //   setTodoList([...todoList, newTask]);
  //   setTaskName("");
  // };

  const deleteTask = (taskId: number): void => {
    // setTodoList(todoList.filter(task => {
    //   return task.id != taskId
    // }))
  };
  
  return (
    <div className='app'>
      <Form method="post">
        <div className='header'>
          <TextInput 
            placeholder="Add a task..." 
            size="md" 
            name="newTask"
            value={taskName}
            onChange={handleInputChange}
          />
          <Button type="submit" aria-label="Add" size="md"> + </Button>
        </div>
      </Form>

      <div className='todo-list'>
        {todoList.map((task: Task, key: number) => {
          return <TodoTask task={task} key={key} deleteTask={deleteTask}/>;
        })}
      </div>
    </div>
  )
}