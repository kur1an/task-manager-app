
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./Components.css";
import { userLogout } from "../store/Slices/userSlice";
import { IconContext } from "react-icons/lib";

export default function Header() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.userSlice);

  const handleLogout = () => {
    dispatch(userLogout());

    toast.success("Logged out successfully!");

    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="task-navbar" sticky="top">

      <Container>

        {/* Brand */}
        <Navbar.Brand as={Link} to="/" className="task-brand">
          <span className="">    <IconContext/>       Task Manager App
 </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="task-navbar-nav" />

        <Navbar.Collapse id="task-navbar-nav">

          {/* Navigation Links */}
          <Nav className="me-auto ms-lg-4">

          

          </Nav>

          {/* User Section */}
          <Nav className="align-items-lg-center">

            {user && (
              <NavDropdown
                title={
                  <span className="user-dropdown-title">
                    <span className="user-avatar">
                      {user.fullname?.charAt(0).toUpperCase() || "U"}
                    </span>

                    <span className="user-name">
                      {user.fullname || "User"}
                    </span>
                  </span>
                }
                id="user-dropdown"
                align="end"
              >

                <NavDropdown.Item disabled>
                  {user.email}
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item
                  as={Link}
                  to="/"
                >
                  My Tasks
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item
                  onClick={handleLogout}
                  className="logout-item"
                >
                  ↪ Logout
                </NavDropdown.Item>

              </NavDropdown>
            )}

          </Nav>

        </Navbar.Collapse>

      </Container>

    </Navbar>
  );
}
