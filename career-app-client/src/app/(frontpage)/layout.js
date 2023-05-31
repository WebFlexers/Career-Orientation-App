"use client";
import "../globals.css";
import "antd/dist/reset.css";
import "bootstrap/dist/css/bootstrap.min.css";

import HomeNavigationBar from "@/components/home.navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <HomeNavigationBar />
        {children}
      </body>
    </html>
  );
}
