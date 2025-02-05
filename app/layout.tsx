import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { BreadcrumbDemo } from "@/components/shadcn/BreadcrumbDemo";

import Navigation from "@/components/shadcn/NavigationMenu";
import { CardTemplate } from "@/components/shadcn/CreateExerciseCard";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <div className="container mx-auto px-4">
          <div className="p-5">
            <Navigation />
          </div>
          <div className="flex flex-col gap-4">
            <BreadcrumbDemo />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
