import { Container, Nav, Navbar } from "react-bootstrap";

const HeaderMenu = () => {
  return (
    <Navbar
      style={{
        width: "300px",
        height: "100vh",
      }}
      className="bg-white mb-3 shadow-sm navbar-custom"
      fixed="top"
    >
      <Container className="flex-column align-items-start">
        <Nav className="flex-column w-100">
          <Nav.Link href="/Dashboard" className="py-2">
            Dashboard
          </Nav.Link>
          <Nav.Link href="/Class" className="py-2">
            Class
          </Nav.Link>
          <Nav.Link href="/Teacher" className="py-2">
            Teacher
          </Nav.Link>
          <Nav.Link href="/Students" className="py-2">
            Students
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default HeaderMenu;
