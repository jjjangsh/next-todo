import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "../providers/QueryProvider";

export const metadata: Metadata = {
  title: "Baro Todo",
  description: "my todo list app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
