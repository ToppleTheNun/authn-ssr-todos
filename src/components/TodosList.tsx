import { prisma } from "~/prisma";

import TodoItem from "./Todo/TodoItem";

async function getTodos() {
  return prisma.todo.findMany({
    orderBy: [{ completed: "asc" }, { updatedAt: "desc" }],
  });
}

export default async function TodosList() {
  const todos = await getTodos();

  return (
    <ul>
      {todos.map(({ id, title, completed }) => (
        <TodoItem key={id} todo={{ id, title, completed }} />
      ))}
    </ul>
  );
}
