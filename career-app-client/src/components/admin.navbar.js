"use client";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "next/image";
import { usePathname } from "next/navigation";

function getHeader(pathName) {
  if (pathName == "/dashboard") {
    return "Κεντρικός Πίνακας";
  } else if (pathName == "/lessons") {
    return "Διδασκαλία";
  } else if (pathName == "/tests") {
    return "Τεστ Αυτοαξιολόγησης";
  }
}

const AdminNavigationBar = (props) => {
  const _pathName = usePathname();

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        sticky="top"
        id="admin-nav"
      >
        <Container fluid>
          <Container style={{ marginLeft: "250px" }}>
            <Navbar.Brand>{getHeader(_pathName)}</Navbar.Brand>
          </Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav className="me-5" style={{ paddingRight: "0" }}>
              <Nav.Item>
                <button style={{ backgroundColor: "transparent", border: "0" }}>
                  <Image
                    src="/notification-icon.png"
                    alt="Icon1"
                    width={25}
                    height={25}
                    style={{ margin: "5px 15px" }}
                  />
                </button>
              </Nav.Item>
              <Nav.Item>
                <button style={{ backgroundColor: "transparent", border: "0" }}>
                  <Image
                    src="/find-icon.png"
                    alt="Icon1"
                    width={25}
                    height={25}
                    style={{ margin: "5px 15px" }}
                  />
                </button>
              </Nav.Item>
              <Nav.Item>
                <button style={{ backgroundColor: "transparent", border: "0" }}>
                  <Image
                    src="/logout-icon.png"
                    alt="Icon1"
                    width={25}
                    height={25}
                    style={{ margin: "5px 15px" }}
                  />
                </button>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavigationBar;
