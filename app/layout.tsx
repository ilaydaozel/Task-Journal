import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ToasterProvider from "./providers/ToasterProvider";
import { Suspense } from "react";
import Loading from "./loading";
import Navbar from "./components/navbar/Navbar";
import getAllYears from "./actions/getAllYears";
import getCurrentDateObjects from "./actions/getCurrentDateObjects";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task Journal of İlayda",
  description: "plan your mind, plant your ideas",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const today = new Date()
  const currentDate = await getCurrentDateObjects({date: new Date(today.getFullYear(), today.getMonth(), today.getDate()+1)});
  const years = await getAllYears();
  return (
    <html lang="en">
      <body className={inter.className}>      
      <Suspense fallback={<Loading />}>
        <ToasterProvider />
        <Navbar currentWeek={currentDate.week} years={years}></Navbar>
        <div className="bg-bg-50 text-text1-800">
          {children}
        </div>
      </Suspense></body>

    
    </html>
  );
}
