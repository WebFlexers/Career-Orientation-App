"use client";
import "../globals.css";
import "antd/dist/reset.css";

import SideBar from "@/components/sidebar";

export const metadata = {
  title: "Root layout",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SideBar />
        {children}
      </body>
    </html>
  );
}
