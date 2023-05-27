"use client";
import "../globals.css";
import "antd/dist/reset.css";
import "bootstrap/dist/css/bootstrap.min.css";

import NavigationBar from "@/components/navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavigationBar />
        {children}
      </body>
    </html>
  );
}
