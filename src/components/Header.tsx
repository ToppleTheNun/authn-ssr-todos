export default function Header() {
  return (
    <header className="container mx-auto sticky top-0 z-40 bg-gray-100">
      <div className="flex h-16 items-center justify-between border-b border-b-slate-200 py-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Todos
        </h1>
      </div>
    </header>
  );
}
