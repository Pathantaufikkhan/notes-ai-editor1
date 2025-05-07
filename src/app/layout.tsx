// app/layout.tsx (Server Component)
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"; // Import your CSS here
// import Header from "@/components/Header"; // Import your Header component here

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Include Header component here */}
        {children} {/* Content of your pages */}
      </body>
    </html>
  );
}
