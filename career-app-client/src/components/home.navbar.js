import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";

const HomeNavigationBar = (props) => {
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session);

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="transparent">
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
              <Nav.Link href="/about" style={{ pointerEvents: "none" }}>
                Σχετικά με εμάς
              </Nav.Link>
              <Nav.Link href="/contact" style={{ pointerEvents: "none" }}>
                Επικοινωνία
              </Nav.Link>
              {session ? (
                <>
                  <Nav.Link href="/dashboard" style={{ color: "#c9901e" }}>
                    Κεντρικός Πίνακας
                  </Nav.Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    style={{
                      border: "0",
                      background: "transparent",
                      color: "#000000A6",
                    }}
                  >
                    Αποσύνδεση
                  </button>
                </>
              ) : (
                <>
                  <Nav.Link href="/login">Σύνδεση</Nav.Link>
                  <Nav.Link href="/register">Εγγραφή</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default HomeNavigationBar;
