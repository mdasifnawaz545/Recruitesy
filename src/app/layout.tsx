import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "../context/AuthProvider";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster"
import { Montserrat } from "next/font/google";


const montserrat = Montserrat({
  weight: '400',
  style: 'normal',
  subsets: ['cyrillic-ext'],
})
export const metadata: Metadata = {
  title: "Recruitesy.",
  description: "A Candidate Recruitment System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`min-h-full min-w-full bg-gradient-to-r from-gray-900 to-[#000] ${montserrat.className}`}>
          <header>
            <Navbar />
          </header>
          <main>
            {children}
          </main>
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}

// bg-[linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(181,108,15,1) 100%)]
// Normal Background Color : bg-gradient-to-r from-gray-700 to-black
// background: rgb(0,0,0);
