import { zodResolver } from "@hookform/resolvers/zod";
import { ButtonWithIcon } from "@singlestone/sugar-react";
import clsx from "clsx";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Checkmark, Trash } from "~/components/Icons";
import { updateSchema } from "~/schemas/Todo";

import { Todo } from "./types";

type FormValues = Omit<Todo, "id">;

interface Props {
  handleDelete: () => Promise<void>;
  handleEdit: (todo: Todo) => Promise<void>;
  isMutating: boolean;
  isPending: boolean;
  todo: Todo;
}
export default function EditTodo({
  handleDelete,
  handleEdit,
  isMutating,
  isPending,
  todo,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    setFocus,
  } = useForm<FormValues>({
    defaultValues: {
      completed: todo.completed,
      title: todo.title,
    },
    resolver: zodResolver(updateSchema),
  });

  useEffect(() => {
    setFocus("title");
  }, [setFocus]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await handleEdit({ id: todo.id, ...data });
  };

  return (
    <li
      className={clsx("bg-white rounded-md overflow-hidden shadow p-3 my-3", {
        "opacity-70": isMutating,
      })}
    >
      <form
        className="flex flex-row flex-wrap gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-initial flex-row gap-3 self-center">
          <label className="sr-only" htmlFor={`todo-${todo.id}-completed`}>
            Completed
          </label>
          <input
            id={`todo-${todo.id}-completed`}
            className="sugar-checkbox self-center"
            type="checkbox"
            {...register("completed", { required: true })}
            disabled={isPending}
          />
        </div>
        <div className="flex-grow">
          <label className="sr-only" htmlFor={`todo-${todo.id}-title`}>
            Text
          </label>
          <input
            id={`todo-${todo.id}-title`}
            className="sugar-text-input"
            type="text"
            placeholder="Todo"
            disabled={isPending || isSubmitting}
            {...register("title", { required: true })}
          />
        </div>
        <div className="flex flex-grow md:flex-none gap-1 md:gap-3 justify-center">
          <ButtonWithIcon disabled={isPending || isSubmitting} type="submit">
            <Checkmark />
            Save
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
      </form>
    </li>
  );
}
