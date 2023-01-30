"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import EditTodo from "./EditTodo";
import NonEditTodo from "./NonEditTodo";
import { Todo } from "./types";

interface Props {
  todo: Todo;
}
export default function TodoItem({ todo }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Create inline loading UI
  const isMutating = isFetching || isPending;

  async function handleEdit(todo: Todo) {
    setIsFetching(true);
    await fetch(`/api/todos/${todo.id}`, {
      method: "PUT",
      body: JSON.stringify({ completed: todo.completed, title: todo.title }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setIsFetching(false);
    startTransition(() => {
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.refresh();
      setIsEditing(false);
    });
  }

  async function handleChange() {
    await handleEdit({ ...todo, completed: !todo.completed });
  }

  async function handleDelete() {
    setIsFetching(true);
    await fetch(`/api/todos/${todo.id}`, {
      method: "DELETE",
    });
    setIsFetching(false);

    startTransition(() => {
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.refresh();
    });
  }

  if (isEditing) {
    return (
      <EditTodo
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        isMutating={isMutating}
        isPending={isPending}
        todo={todo}
      />
    );
  }

  return (
    <NonEditTodo
      handleChange={handleChange}
      handleDelete={handleDelete}
      isMutating={isMutating}
      isPending={isPending}
      setIsEditing={setIsEditing}
      todo={todo}
    />
  );
}
