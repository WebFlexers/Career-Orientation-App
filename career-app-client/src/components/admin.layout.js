import AdminNavigationBar from "./admin.navbar";
import SideBar from "./sidebar";

export default function AdminLayout({ children }) {
  return (
    <>
      <AdminNavigationBar />
      <SideBar />
      <div className="content">{children}</div>
    </>
  );
}
