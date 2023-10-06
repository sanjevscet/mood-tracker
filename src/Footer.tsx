import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../src/logo.png";
import { Facebook, Instagram, Linkedin, Twitter } from "react-bootstrap-icons";
export default function FooterComponent() {
  return (
    <Navbar
      style={{
        backgroundColor: "#005151",
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
    >
      <div className="container-fluid text-white">
        <div style={{ opacity: 0 }}>
          <Link to="/" className="nav-link text-white">
            <Navbar.Brand className="text-white">
              <img
                src={logo}
                alt="logo"
                style={{ width: 120, height: 40, padding: 10 }}
              />
            </Navbar.Brand>
          </Link>
        </div>
        <div className="d-flex justify-content-end">
          <Nav className="justify-content-end">
            <Link to="/about" className="nav-link text-white ms-2">
              <Twitter />
            </Link>
            <Link to="/#" className="nav-link text-white ms-2">
              <Linkedin />
            </Link>
            <Link to="/#" className="nav-link text-white ms-2">
              <Facebook />
            </Link>
            <Link to="/#" className="nav-link text-white ms-2">
              <Instagram />
            </Link>
          </Nav>
        </div>
      </div>
    </Navbar>
  );
}
