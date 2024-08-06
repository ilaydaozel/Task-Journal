import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ToasterProvider from "./providers/ToasterProvider";
import { Suspense } from "react";
import Loading from "./loading";
import Navbar from "./components/navbar/Navbar";
import getAllYears from "./actions/year/getAllYears";
import getCurrentDateObjects from "./actions/date/getCurrentDateObjects";

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
  const utcDate = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
  const currentDateObjects = await getCurrentDateObjects({date: utcDate});
  const years = await getAllYears();

  return (
  <html lang="en">
    <body className={inter.className}>      
    <Suspense fallback={<Loading />}>
      <ToasterProvider />
      <Navbar currentDate={currentDateObjects} years={years}></Navbar>
      <div className="bg-bg-50 text-text1-800">
        {children}
      </div>
    </Suspense></body>
  </html>
    );
}
