import React from 'react';
import type { Task } from './Interfaces';
import { MdDelete } from "react-icons/md";
import { useMantineTheme, ActionIcon, CloseButton } from '@mantine/core';

interface Props {
    task: Task
}

export const TodoTask = ({task}: Props) => {
  const theme = useMantineTheme();
  
  return (
    <div className='task'>
        <div className='content'>
          {task.name}
        </div>
        <CloseButton className="delete-btn" icon={<MdDelete />} />
    </div>
  )
}

export default TodoTask