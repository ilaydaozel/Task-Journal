import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ToasterProvider from "./providers/ToasterProvider";
import { Suspense } from "react";
import Loading from "./loading";
import Navbar from "./components/navbar/Navbar";
import { getWeekNumber } from "./utils/Helper";
import getAllYears from "./actions/getAllYears";

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
  var weekNumber = getWeekNumber(new Date());
  /*
  console.log("weekNumber", weekNumber);
  const currentWeek = await getWeekByWeekNumber({yearNumber: weekNumber[0], weekNumber: weekNumber[1]});
  console.log("currentWeek:",currentWeek)
  */
  const years = await getAllYears();
  return (
    <html lang="en">
      <body className={inter.className}>      
      <Suspense fallback={<Loading />}>
        <ToasterProvider />
        <Navbar currentWeek={null} years={years}></Navbar>
        <div className="bg-bg-50 text-text1-800">
          {children}
        </div>
      </Suspense></body>

    
    </html>
  );
}
