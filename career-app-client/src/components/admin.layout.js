import AdminNavigationBar from "./admin.navbar";
import SideBar from "./sidebar";
import { useSession, getSession } from "next-auth/react";

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    return <h2 style={{ textAlign: "center" }}>Log in to view this page!</h2>;
  }

  return (
    <>
      <AdminNavigationBar />
      <SideBar />
      <div className="content">{children}</div>
    </>
  );
}
