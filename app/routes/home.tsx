import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { TodoPage } from "../todo_page/TodoPage";
import { requireUser } from "~/auth";
import { db } from "~/db";

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

  return { todoList };
}


export async function action({ request }: ActionFunctionArgs) {
  const user = await requireUser(request);
  const formData = await request.formData();
  const actionType = formData.get("actionType");
  console.log("Action type: " + actionType)
  
  if (actionType === "add") {
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

  } else if (actionType === "toggle") {
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

  } else if (actionType === "delete") {
    const taskId = formData.get("taskId");
    
    await db.query(
      `
      DELETE FROM task
      WHERE id = $1
      `,
      [taskId]
    );
  }

  return null
}

export default function Home() {
  return <TodoPage />;
}
