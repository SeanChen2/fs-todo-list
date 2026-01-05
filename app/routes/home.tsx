import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { TodoPage } from "../todo_page/TodoPage";
import { requireUser } from "~/auth";
import { getDb } from "~/db";
import { FaBreadSlice } from "react-icons/fa6";
import type { Pool } from "@neondatabase/serverless";

export async function loader({ request, context }: LoaderFunctionArgs) {
  const user = await requireUser(request, context);
  const db = getDb(context);

  const { rows: tasks } = await db.query(
    `
    SELECT id, title, completed
    FROM task
    WHERE user_id = $1
    ORDER BY created_at DESC
    `,
    [user.id]
  );

  // Map database fields to Task interface (title -> name)
  const todoList = tasks.map(task => ({
    id: task.id,
    name: task.title,
    completed: task.completed,
  }));

  return { 
    headers: {
      'Cache-Control': 'max-age=3600',
    },
    user: {
      name: user.name,
    },
    todoList 
  };
}


export async function action({ request, context }: ActionFunctionArgs) {
  const t0 = Date.now();
  const user = await requireUser(request, context);
  console.log("requireUser ms", Date.now() - t0)
  const db = getDb(context);
  const formData = await request.formData();
  const actionType = formData.get("actionType");
  console.log("Action type: " + actionType);

  switch (actionType) {
    case "add":
      await addTask(formData, user, db);
      break;
    case "toggle":
      await toggleTask(formData, db);
      break;
    case "delete":
      await deleteTask(formData, db);
      break;
    case "edit":
      await editTask(formData, db);
      break;
  }

  return null;
}

async function addTask(formData: FormData, user: any, db: Pool) {
  const title = formData.get("newTask") as string;

  if (!title.trim()) {
    return { error: "Task title is required" };
  }

  const t0 = Date.now();
  await db.query(
    `
    INSERT INTO task (user_id, title)
    VALUES ($1, $2)
    `,
    [user.id, title.trim()]
  );
  console.log("insert ms", Date.now() - t0)
}

async function toggleTask(formData: FormData, db: Pool) {
  const taskId = formData.get("taskId");
  const completed = formData.get("completed");

  await db.query(
    `
    UPDATE task
    SET completed = $1
    WHERE id = $2
    `,
    [completed, taskId]
  );
}

async function deleteTask(formData: FormData, db: Pool) {
  const taskId = formData.get("taskId");
    
  await db.query(
    `
    DELETE FROM task
    WHERE id = $1
    `,
    [taskId]
  );
}

async function editTask(formData: FormData, db: Pool) {
  const taskId = formData.get("taskId");
  const newTitle = formData.get("newTitle");

  await db.query(
    `
    UPDATE task
    SET title = $1
    WHERE id = $2
    `,
    [newTitle, taskId]
  );
}

export default function Home() {
  return <TodoPage />;
}
