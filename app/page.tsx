import CreateTodo from "@/components/CreateTodo";
import TodoList from "@/components/TodoList";
import PublicLayout from "@/layouts/PublicLayout";

export default async function Home() {
  return (
    <PublicLayout>
      <main className="container my-10">
        <TodoList />
        <CreateTodo />
      </main>
    </PublicLayout>
  );
}
