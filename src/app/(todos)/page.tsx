import AddTodos from "~/components/AddTodos";
import TodosList from "~/components/TodosList";

export default function Page() {
  return (
    <div className="container mx-auto py-6 flex flex-1 flex-col gap-8">
      {/* @ts-expect-error Server Component */}
      <TodosList />
      <hr className="border-slate-200" />
      <AddTodos />
    </div>
  );
}
