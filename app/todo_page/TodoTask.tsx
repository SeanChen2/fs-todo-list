import React, { useState, type ChangeEvent, type FormEvent, type MouseEvent } from 'react';
import type { Task } from './Interfaces';
import { MdDelete } from "react-icons/md";
import { useMantineTheme, ActionIcon, CloseButton, Checkbox, Text, TextInput } from '@mantine/core';
import { useFetcher } from 'react-router';

interface Props {
    task: Task
}

export const TodoTask = ({task}: Props) => {
  const fetcher = useFetcher();
  const [editing, setEditing] = useState<boolean>(false);
  const [newTaskName, setNewTaskName] = useState<string>(task.name);

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

  const editTask = (event: FormEvent<HTMLFormElement>) => {
    setEditing(false);
    task.name = newTaskName;  // Optimistic update
  }
  
  return (
    <div className='task'>
      <Checkbox 
        checked={task.completed}
        onChange={onCheckboxToggle}
      />

      {editing ? (
        // Edit mode
        <fetcher.Form method="post" onSubmit={editTask}>
          <TextInput
            autoFocus
            className='taskName'
            placeholder='Enter a name for this task...'
            name="newTitle"
            value={newTaskName}
            onChange={e => setNewTaskName(e.currentTarget.value)}
            onBlur={() => setEditing(false)}
          />

          <input type="hidden" name="actionType" value="edit" />
          <input type="hidden" name="taskId" value={task.id} />
        </fetcher.Form>
      ) : (
        // Default mode (view)
        <Text 
          className={`taskName ${task.completed ? 'completed' : ''}`}
          onClick={() => {
            setEditing(true);
            setNewTaskName(task.name);
          }}
        >
          {task.name}
        </Text>
      )}

      <CloseButton 
        className="delete-btn" 
        onClick={deleteTask}
      />
    </div>
  )
}

export default TodoTask