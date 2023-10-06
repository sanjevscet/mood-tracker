import { Navbar, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import logo from "../src/logo.png";
import { EmojiHeartEyes } from "react-bootstrap-icons";

export default function NavbarComponent() {
  const location = useLocation();
  const segment = location.pathname.split("/");

  const isActive = (path: string): string => {
    const res = segment[segment.length - 1] === path ? "active" : "";
    console.log({ res, path, segment, las: segment[segment.length - 1] });
    return res;
  };

  return (
    <Navbar style={{ backgroundColor: "#005151" }}>
      <div
        className="container-fluid text-white"
        style={{ justifyContent: "flex-start" }}
      >
        <div>
          <Link to="/" className="nav-link text-white">
            <Navbar.Brand className="text-white">
              <i className="fa fa-bars mr-2" aria-hidden="true"></i>

              <img
                className="ms-2"
                src={logo}
                alt="logo"
                style={{ width: 120, height: 50, padding: 10 }}
              />
            </Navbar.Brand>
          </Link>
        </div>
        <div className="d-flex justify-content-end">
          <Nav className="mr-auto" style={{ fontSize: 20 }}>
            <Link
              to="/mood-tracker"
              className={`nav-link text-white ${isActive("mood-tracker")} `}
            >
              <EmojiHeartEyes style={{ fontSize: "150%" }} />
              <span className="ms-2">Mood Tracker</span>
            </Link>
          </Nav>
        </div>
      </div>
    </Navbar>
  );
}
