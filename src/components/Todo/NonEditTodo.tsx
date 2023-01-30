import { ButtonWithIcon } from "@singlestone/sugar-react";
import clsx from "clsx";

import { Edit, Trash } from "~/components/Icons";

import { Todo } from "./types";

interface Props {
  handleChange: () => Promise<void>;
  handleDelete: () => Promise<void>;
  isMutating: boolean;
  isPending: boolean;
  setIsEditing: (p: boolean) => void;
  todo: Todo;
}
export default function NonEditTodo({
  handleChange,
  handleDelete,
  isMutating,
  isPending,
  setIsEditing,
  todo,
}: Props) {
  return (
    <li
      className={clsx(
        "bg-white rounded-md overflow-hidden shadow p-3 my-3 flex flex-row flex-wrap gap-3",
        { "opacity-70": isMutating }
      )}
    >
      <div className="flex flex-initial self-center">
        <label className="sr-only" htmlFor={`todo-${todo.id}`}>
          Completed
        </label>
        <input
          id={`todo-${todo.id}`}
          className="sugar-checkbox"
          type="checkbox"
          checked={todo.completed}
          onChange={handleChange}
          disabled={isPending}
        />
      </div>
      <p
        className={clsx(
          "flex-1 self-center inline-block text-left text-lg tracking-wide leading-7 overflow-auto",
          { "line-through": todo.completed }
        )}
      >
        {todo.title}
      </p>
      <div className="flex flex-1 md:flex-none gap-1 md:gap-3 self-center justify-center">
        <ButtonWithIcon
          disabled={isPending}
          onClick={() => setIsEditing(true)}
          color="accent"
          variant="solid"
        >
          <Edit />
          Edit
        </ButtonWithIcon>
        <ButtonWithIcon
          disabled={isPending}
          onClick={handleDelete}
          color="destructive"
          variant="outline"
        >
          <Trash />
          Delete
        </ButtonWithIcon>
      </div>
    </li>
  );
}
