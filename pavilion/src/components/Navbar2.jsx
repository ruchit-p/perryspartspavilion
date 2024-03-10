import React from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Items", href: "/items" },
  { name: "Cart", href: "/cart" },
];

const addPages = [
  { name: "Add Items", href: "/additems" },
  { name: "Add Rooms", href: "/addrooms" },
  { name: "Add Categories", href: "/addcategories" },
  { name: "Add Status", href: "/addstatus" },
  { name: "Add Storage Type", href: "/addstoragetype" },
];

const viewPages = [
  { name: "View Items", href: "/viewitems" },
  { name: "View Rooms", href: "/viewrooms" },
  { name: "View Categories", href: "/viewcategories" },
  { name: "View Status", href: "/viewstatus" },
  { name: "View Storage Types", href: "/viewstoragetypes" },
];

const Navbar2 = () => {
  const { user, logout, userRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // No need to use setUser in state, use currUser directly from useAuth
  }, [user]); // React to changes in currUser

  const handleSignOut = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  return (
    <nav className="navbar navbar-expand-xl bg-body-tertiary">
      <div className="container-fluid bg-light">
        <Link className="navbar-brand" to="/">
          Perry's Parts Pavilion
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
          data-bs-theme="dark"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {navigation.map((item) => (
              <Link
                className={`nav-link my-auto${item.current ? "active" : ""}`}
                to={item.href}
                key={item.name}
              >
                <li className="nav-item py-3"> {item.name} </li>
              </Link>
            ))}
            {(userRole === "superadmin" || userRole === "admin") && (
              <>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownAdd"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Add New...
                  </a>
                  <ul
                    className="dropdown-menu "
                    aria-labelledby="navbarDropdownAdd"
                  >
                    {addPages.map((page) => (
                      <Link
                        className="dropdown-item"
                        to={page.href}
                        key={page.name}
                      >
                        <li>{page.name}</li>
                      </Link>
                    ))}
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownView"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    View...
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownView"
                  >
                    {viewPages.map((page) => (
                      <Link
                        className="dropdown-item"
                        to={page.href}
                        key={page.name}
                      >
                        <li>{page.name}</li>
                      </Link>
                    ))}
                  </ul>
                </li>

                <Link className="nav-link my-auto" to="/approvetransactions">
                  <li className="nav-item py-3">Approve Transactions</li>
                </Link>
              </>
            )}
          </ul>
          <div className="d-flex">
            {!user ? (
              <>
                <Link to="/login" className="btn btn-outline-success me-2">
                  Log In
                </Link>
                <Link to="/signup" className="btn btn-outline-success">
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <li className="nav-item dropdown" data-bs-toggle="dropdown">
                  <a
                    className="nav-link dropdown-toggle "
                    href="#"
                    id="navbarDropdownView"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user.email}
                  </a>

                  <ul
                    className="dropdown-menu  border border-dark mt-2 bg-secondary btn-outline-success mx-auto me-2 text-dark px-5"
                    aria-labelledby="navbarDropdownView" onClick={handleSignOut}
                  >
                    <li className=" text-dark " onClick={handleSignOut}>
                      Sign Out
                    </li>
                  </ul>
                </li>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar2;
