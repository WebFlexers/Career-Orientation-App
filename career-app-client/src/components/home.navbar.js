import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "next/image";
import { useRouter } from "next/router";

const HomeNavigationBar = (props) => {
  const router = useRouter();
  let _style = {};
  if (router.pathname != "/") {
    _style = { boxShadow: "0px 10px 5px -10px #111" };
  }
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="transparent" style={_style}>
        <Container>
          <Navbar.Brand href="/">
            <Image
              src="/images/career-logo.png"
              alt="career logo"
              width={80}
              height={75}
              className="d-inline-block brand-img"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav className="me-5">
              <Nav.Link href="/">Αρχική Σελίδα</Nav.Link>
              <Nav.Link href="/about">Σχετικά με εμάς</Nav.Link>
              <Nav.Link href="/contact">Επικοινωνία</Nav.Link>
              <Nav.Link href="/login">Σύνδεση</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default HomeNavigationBar;
