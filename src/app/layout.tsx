"use client";
import "./globals.css";
import Footer from "./footer";
import { MessageProvider } from "@/components/hook/messageContext";
import { SessionProvider } from "next-auth/react";
import HeaderLayout from "./headerLayout";
// export const metadata = {
//   title: 'Shop',
//   description: 'My Shop App',
// }
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased flex flex-col max-w-[1920px] m-auto`}
      >
        <SessionProvider>
          <MessageProvider>
            <HeaderLayout />
            <main>{children}</main>
            <Footer />
          </MessageProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
