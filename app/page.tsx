import TasksPage from "@/app/(pages)/taskList/page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-16" id="root">
      <TasksPage/>
    </main>
  );
}
