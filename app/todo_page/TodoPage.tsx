import { type ChangeEvent, useState } from 'react';
import { ActionIcon, TextInput, Button } from '@mantine/core';
import { FaSquarePlus } from 'react-icons/fa6';
import './TodoPage.css';
import { type Task } from './Interfaces';
import TodoTask from './TodoTask';

export const TodoPage = () => {
  const [taskName, setTaskName] = useState<string>("");
  const [todoList, setTodoList] = useState<Task[]>([]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "newTask") {
      setTaskName(event.target.value);
    }
  }

  const addTask = (): void => {
    if (taskName === "") return;

    const newTask = {name: taskName, completed: false}
    setTodoList([...todoList, newTask]);
    console.log(todoList);
    setTaskName("");
  }
  
  return (
    <div className='app'>
      <div className='header'>
        <TextInput 
          placeholder="Add a task..." 
          size="md" 
          name="newTask"
          value={taskName}
          onChange={handleInputChange}
        />
        <Button onClick={addTask} aria-label="Add" size="md"> + </Button>

      </div>
      <div className='todo-list'>
        {todoList.map((task: Task, key: number) => {
          return <TodoTask task={task} key={key}/>;
        })}
      </div>
    </div>
  )
}