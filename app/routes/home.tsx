import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import { TodoPage } from "../todo_page/TodoPage";
import { auth, requireUser } from "~/auth";
import { db } from "~/db";
import { FaBreadSlice } from "react-icons/fa6";
import { authClient } from "~/backend/auth-client";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request);

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
    user: {
      name: user.name,
    },
    todoList 
  };
}


export async function action({ request }: ActionFunctionArgs) {
  const user = await requireUser(request);
  const formData = await request.formData();
  const actionType = formData.get("actionType");
  console.log("Action type: " + actionType)

  switch (actionType) {
    case "add":
      await addTask(formData, user);
      return null;
    case "toggle":
      await toggleTask(formData);
      return null;
    case "delete":
      await deleteTask(formData);
      return null;
    case "edit":
      await editTask(formData);
      return null;
    case "logOut":
      const response = await logOut();
      return redirect("/login", {
        headers: response.headers,
      });
  }
}

async function addTask(formData: FormData, user: any) {
  const title = formData.get("newTask") as string;

  if (!title.trim()) {
    return { error: "Task title is required" };
  }

  await db.query(
    `
    INSERT INTO task (user_id, title)
    VALUES ($1, $2)
    `,
    [user.id, title.trim()]
  );
}

async function toggleTask(formData: FormData) {
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

async function deleteTask(formData: FormData) {
  const taskId = formData.get("taskId");
    
  await db.query(
    `
    DELETE FROM task
    WHERE id = $1
    `,
    [taskId]
  );
}

async function editTask(formData: FormData) {
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

async function logOut() {
  return await auth.api.signOut({
    headers: {},
    asResponse: true,
  });
}

export default function Home() {
  return <TodoPage />;
}
