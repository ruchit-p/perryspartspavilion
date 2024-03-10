// src/components/Navbar.jsx
import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Items", href: "/items", current: false },
  { name: "Cart", href: "/cart", current: false },
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

const Navbar = () => {
  const navigate = useNavigate(); // Hook to navigate
  const [selectedPage, setSelectedPage] = useState(""); // State to keep track of the selected page

  const handleSelectChange = (event) => {
    setSelectedPage(event.target.value); // Update the selected page
    navigate(event.target.value); // Navigate to the selected page
    setSelectedPage(""); // Reset the selected page
  };

  const { user: currUser, logout, userRole } = useAuth(); // Access logout function if needed

  useEffect(() => {
    // No need to use setUser in state, use currUser directly from useAuth
  }, [currUser]); // React to changes in currUser

  const handleSignOut = async () => {
    try {
      await logout();
      navigate("/"); // Redirect to home page or login page after logout
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  return (
    <nav className="navbar">
      <Link to={"/"}>
        <h1 className="logo">Perry's Parts Pavilion</h1>
      </Link>
      <div className="links">
        <ul className="nav">
          {navigation.map((link) => (
            <Link
              to={link.href}
              key={link.name}
              className={link.current ? "active" : ""}
            >
              <li className="nav-item">{link.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="nav auth">
        {userRole === "superadmin" || userRole === "admin" ? (
          <>
            <select
              className="dropdown" // Apply styling class
              value={selectedPage}
              onChange={handleSelectChange}
            >
              <option value="" disabled selected>
                Add New...
              </option>
              {addPages.map((page) => (
                <option key={page.name} value={page.href}>
                  {page.name}
                </option>
              ))}
            </select>
            <select
              className="dropdown" // Apply styling class
              value={selectedPage}
              onChange={handleSelectChange}
            >
              <option value="" disabled selected>
                View...
              </option>
              {viewPages.map((page) => (
                <option key={page.name} value={page.href}>
                  {page.name}
                </option>
              ))}
            </select>
            <Link to={"/approvetransactions"} className="nav-item">
              Approve Transactions
            </Link>
          </>
        ) : (
          <></>
        )}
        {!currUser ? (
          <>
            <Link to="/login" className="nav-item">
              Log In
            </Link>
            <Link to="/signup" className="nav-item">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <button onClick={handleSignOut} className="nav-item">
              Sign Out
            </button>
            <button className="nav-item">{currUser.email}</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
