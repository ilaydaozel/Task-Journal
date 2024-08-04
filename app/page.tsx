import Navbar from "./components/navbar/Navbar";
import TasksPage from "@/app/(pages)/taskList/page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center" id="root">
      <TasksPage/>
    </main>
  );
}
