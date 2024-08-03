import Link from "next/link";
import Navbar from "./components/navbar/Navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-bg-100" id="root">
      <Navbar></Navbar>
      <div className="container h-24"></div>
      <div>
      <h1>Welcome to Task-Journal</h1>
      <Link href="/tasks">View Tasks</Link>
    </div>
    </main>
  );
}
