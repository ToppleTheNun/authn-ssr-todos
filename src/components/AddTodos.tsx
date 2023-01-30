"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ButtonWithIcon } from "@singlestone/sugar-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Checkmark } from "~/components/Icons";
import { createSchema } from "~/schemas/Todo";

interface FormValues {
  title: string;
}

export default function AddTodos() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(createSchema) });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await fetch(`/api/todos`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    reset();
    startTransition(() => {
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.refresh();
    });
  };

  return (
    <form
      className="flex flex-col md:flex-row gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col flex-1">
        <label className="sugar-input-label" htmlFor="todo-title">
          Title
          {errors.title ? (
            <span className="text-red-500"> {errors.title.message}</span>
          ) : undefined}
        </label>
        <input
          id="todo-title"
          className="sugar-text-input"
          type="text"
          placeholder="Todo"
          disabled={isPending || isSubmitting}
          {...register("title", { required: true })}
        />
      </div>
      <div className="flex flex-row gap-3 self-end">
        <ButtonWithIcon
          className="whitespace-nowrap"
          disabled={isPending || isSubmitting}
          type="submit"
        >
          <Checkmark />
          Add Item
        </ButtonWithIcon>
      </div>
    </form>
  );
}
