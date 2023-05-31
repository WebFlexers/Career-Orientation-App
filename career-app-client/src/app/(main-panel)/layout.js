"use client";
import "../globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "@/components/sidebar";
import AdminNavigationBar from "@/components/admin.navbar";

export default function RootLayout({ children }) {
  return (
    <>
      <AdminNavigationBar />
      <SideBar />
      <div className="content">{children}</div>
    </>
  );
}
