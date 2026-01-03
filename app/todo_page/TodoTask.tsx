import React from 'react';
import type { Task } from './Interfaces';
import { MdDelete } from "react-icons/md";
import { useMantineTheme, ActionIcon, CloseButton, Checkbox } from '@mantine/core';

interface Props {
    task: Task
    deleteTask(taskId: number): void
}

export const TodoTask = ({task, deleteTask}: Props) => {
  const theme = useMantineTheme();
  
  return (
    <div className='task'>
      <Checkbox />
      <div className='content'>
        {task.name}
      </div>

      <CloseButton 
        className="delete-btn" 
        onClick={() => deleteTask(task.id)} 
      />
    </div>
  )
}

export default TodoTask