import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ToasterProvider from "./providers/ToasterProvider";
import { Suspense } from "react";
import Loading from "./loading";
import Navbar from "./components/navbar/Navbar";
import getAllYears from "./actions/year/getAllYears";
import getCurrentDateObjects from "./actions/date/getCurrentDateObjects";
import getDayByDate from "./actions/day/getDayByDate";

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
  const today = new Date();
  const currentDateObjects = await getCurrentDateObjects({date: new Date(today.getFullYear(), today.getMonth(), today.getDate())});
  const years = await getAllYears();
  const date = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const day = await getDayByDate({date: date})
  console.log("sent day: " + date)
  console.log("day", day);
  return (
  <html lang="en">
    <body className={inter.className}>      
    <Suspense fallback={<Loading />}>
      <ToasterProvider />
      <Navbar currentDate={currentDateObjects} years={years}></Navbar>
      <div className="bg-bg-50 text-text1-800">
        {children}
        <h1> sent date: {date.toISOString()}</h1>
        <h2> week:{years[0].months[7].weeks[0].id}</h2>
      <h1>Day: {day?.id}</h1>
      <h1>date.toISOString,: {date.toISOString()}</h1>
      </div>
    </Suspense></body>
  </html>
    );
}
