import React, { type ChangeEvent, type MouseEvent } from 'react';
import type { Task } from './Interfaces';
import { MdDelete } from "react-icons/md";
import { useMantineTheme, ActionIcon, CloseButton, Checkbox } from '@mantine/core';
import { useFetcher } from 'react-router';

interface Props {
    task: Task
}

export const TodoTask = ({task}: Props) => {
  const fetcher = useFetcher();
  const theme = useMantineTheme();

  const onCheckboxToggle = (event: ChangeEvent<HTMLInputElement>) => {
    fetcher.submit(
      {
        actionType: "toggle",
        taskId: String(task.id),
        completed: String(event.currentTarget.checked),
      },
      { method: "post" }
    )
  }

  const deleteTask = (event: MouseEvent<HTMLButtonElement>) => {
    fetcher.submit(
      {
        actionType: "delete",
        taskId: String(task.id),
      },
      { method: "post" }
    )
  }
  
  return (
    <div className='task'>
      <Checkbox 
        checked={task.completed}
        onChange={onCheckboxToggle}
      />

      <div className='content'>
        {task.name}
      </div>

      <CloseButton 
        className="delete-btn" 
        onClick={deleteTask}
      />
    </div>
  )
}

export default TodoTask