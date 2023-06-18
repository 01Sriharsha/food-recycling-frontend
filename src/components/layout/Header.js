import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation } from "react-router-dom";
import { CustomContext } from "../../context/AuthContext";
import Logout from "../authentication/Logout";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { Button } from "react-bootstrap";
import { FaHandsHelping } from "react-icons/fa";

export default function Header() {
  const context = CustomContext();

  const { pathname } = useLocation();

  const [show, setShow] = useState(false);

  const toggle = () => setShow(!show);


  return (
    <Navbar
      bg="primary"
      expand="md"
      className="shadow text-dark"
      sticky="top"
      style={{
        minHeight: "10vh",
        backgroundColor: "transparent",
        color: "black",
      }}
    >
      <Container fluid className="text-light">
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center gap-1 text-light fw-semibold text-uppercase"
        >
          <FaHandsHelping size={"1.7rem"} />
          <span>Food Recycle</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="header me-auto my-2 my-lg-0 d-flex justify-content-between w-100 text-light"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <div
              className="d-flex 
                        gap-2 align-items-start align-items-md-center flex-column flex-md-row"
            >
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/about">
                About Us
              </Nav.Link>
              <Nav.Link as={Link} to="/contact">
                Contact Us
              </Nav.Link>
              {context?.isAuthenticated && (
                <Nav.Link
                  as={Link}
                  to={
                    (context?.user === "admin" && "/admin") ||
                    (context?.user?.user === "ngo" && "/ngo") ||
                    (context?.user?.user === "donor" && "/donor") ||
                    (context?.user?.user === "member" && "/member")
                  }
                >
                  Dashboard
                </Nav.Link>
              )}
            </div>
            <div className="d-flex align-items-start align-items-md-center gap-2 flex-column flex-md-row">
              {context?.isAuthenticated && (
                <Nav.Link as={"span"} className="text-capitalize text-light">
                  Welcome, {context?.user?.name || context?.user}
                </Nav.Link>
              )}
              {(!context?.isAuthenticated ||
                context?.user?.user === "donor") && (
                <Nav.Link as={Link} to="/donate">
                  Donate Now
                </Nav.Link>
              )}
              {context?.isAuthenticated && context?.user?.user === "member" && (
                <>
                  <Nav.Link as={Link} to="/member/request-food">
                    Request Food
                  </Nav.Link>
                  <Nav.Link as={Link} to="/member/enquiries">
                    My Enquiries
                  </Nav.Link>
                </>
              )}
              <>
                {context?.isAuthenticated ? (
                  <Nav.Link onClick={toggle} as="div" className="text-white">
                    <div
                      className="d-flex align-items-center gap-1 p-1"
                      style={{ cursor: "pointer" }}
                    >
                      <span>Logout</span>
                      <BiLogOut size={"1.3rem"} color="white" />
                    </div>
                    <Logout show={show} toggle={toggle} />
                  </Nav.Link>
                ) : (
                  (pathname === "/" || pathname === "/register") && (
                    <Nav.Link as={Link} to="/login">
                      <div className="d-flex align-items-center">
                        <span>Login</span>
                        <BiLogIn size={"1.2rem"} color="white" />
                      </div>
                    </Nav.Link>
                  )
                )}
              </>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
