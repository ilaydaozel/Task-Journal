import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ToasterProvider from "./providers/ToasterProvider";
import { Suspense } from "react";
import Loading from "./loading";
import Navbar from "./components/navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task Journal of İlayda",
  description: "plan your mind, plant your ideas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>      
      <Suspense fallback={<Loading />}>
        <ToasterProvider />
        <Navbar></Navbar>
        <div className="bg-bg-100 text-text1-800">
          {children}
        </div>
      </Suspense></body>

    
    </html>
  );
}
