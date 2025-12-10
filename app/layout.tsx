import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Auth App - Login & Register",
  description: "User authentication with Supabase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
