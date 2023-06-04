import HomeNavigationBar from "./home.navbar";
import { Container } from "react-bootstrap";

export default function HomeLayout({ children }) {
  return (
    <>
      <HomeNavigationBar />
      <main>{children}</main>
    </>
  );
}
