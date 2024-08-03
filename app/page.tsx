import Link from "next/link";
import Navbar from "./components/navbar/Navbar";
import TasksPage from "./components/taskList/TaskList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-bg-100" id="root">
      <Navbar></Navbar>
      <div className="container h-24"></div>
    <TasksPage/>
    </main>
  );
}
