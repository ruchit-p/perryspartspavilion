// App.jsx
import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Navigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Navbar2 from "./components/Navbar2";
import HomePage from "./pages/HomePage";
import ItemsPage from "./pages/ItemsPage";
import CheckoutPage from "./pages/CheckoutPage";
// add pages
import AddItems from "./pages/Add/AddItems";
import AddRooms from "./pages/Add/AddRooms";
import AddCategories from "./pages/Add/AddCategories";
import AddStatus from "./pages/Add/AddStatus";
import AddStorageType from "./pages/Add/AddStorageType";
// view pages
import ViewItems from "./pages/View/ViewItems";
import ViewCategories from "./pages/View/ViewCategories";
import ViewStatus from "./pages/View/ViewStatus";
import ViewRooms from "./pages/View/ViewRooms";
import ViewStorageTypes from "./pages/View/ViewStorageTypes";
// detail pages
import ItemDetails from "./pages/Detail/ItemDetails";
import RoomDetails from "./pages/Detail/RoomDetails";
import CategoryDetails from "./pages/Detail/CategoryDetails";
import StatusDetails from "./pages/Detail/StatusDetails";
import StorageTypeDetails from "./pages/Detail/StorageTypeDetails";
import SignupPage from "./pages/Signup";
import Signup2 from "./pages/Signup2";
import LoginPage from "./pages/Login";
import Login2 from "./pages/Login2";
import Cart from "./pages/Cart";
import Cart2 from "./pages/Cart2";
import ApproveTransactionPage from "./pages/ApproveTransaction";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminOnly from "./components/AdminOnly";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar2 />
        <RoutesWithAuth />
        <RoutesWithoutAuth />
      </AuthProvider>
    </Router>
  );
}

function RoutesWithoutAuth() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup2 />} />
      {/* <Route path="/login" element={<LoginPage />} /> */}
      <Route path="/login" element={<Login2 />} />
      <Route path="/items" element={<ItemsPage />} />
    </Routes>
  );
}

function RoutesWithAuth() {
  const { dbUser } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {dbUser ? (
        <>
          <Route
            path="/cart"
            element={
              <CartProvider>
                <Cart2 />
              </CartProvider>
            }
          />
          <Route
            path="/checkout"
            element={
              <CartProvider>
                <CheckoutPage />
              </CartProvider>
            }
          />
          <Route
            path="/items/:itemId"
            element={
              <CartProvider>
                <ItemDetails />
              </CartProvider>
            }
          />
        </>
      ) : (
        <>
          {/* Redirect these paths to the homepage if there is no user */}
          <Route path="/cart" element={<Navigate replace to="/" />} />
          <Route path="/checkout" element={<Navigate replace to="/" />} />
          <Route path="/items/:itemId" element={<Navigate replace to="/" />} />
        </>
      )}
      {/* add pages - protected (admin only) */}
      <Route
        path="/additems"
        element={
          <ProtectedRoute>
            <AdminOnly>
              <AddItems />
            </AdminOnly>
          </ProtectedRoute>
        }
      />
      <Route
        path="/addrooms"
        element={
          <ProtectedRoute>
            <AdminOnly>
              <AddRooms />
            </AdminOnly>
          </ProtectedRoute>
        }
      />
      <Route
        path="/addcategories"
        element={
          <ProtectedRoute>
            <AdminOnly>
              <AddCategories />
            </AdminOnly>
          </ProtectedRoute>
        }
      />
      <Route
        path="/addstatus"
        element={
          <ProtectedRoute>
            <AdminOnly>
              <AddStatus />
            </AdminOnly>
          </ProtectedRoute>
        }
      />
      <Route
        path="/addstoragetype"
        element={
          <ProtectedRoute>
            <AdminOnly>
              <AddStorageType />
            </AdminOnly>
          </ProtectedRoute>
        }
      />
      {/* view pages - protected (admin only)  */}
      <Route
        path="/viewitems"
        element={
          <ProtectedRoute>
            <AdminOnly>
              <ViewItems />
            </AdminOnly>
          </ProtectedRoute>
        }
      />
      <Route
        path="/viewrooms"
        element={
          <ProtectedRoute>
            <AdminOnly>
              <ViewRooms />
            </AdminOnly>
          </ProtectedRoute>
        }
      />
      <Route
        path="/viewcategories"
        element={
          <ProtectedRoute>
            <AdminOnly>
              <ViewCategories />
            </AdminOnly>
          </ProtectedRoute>
        }
      />
      <Route
        path="/viewstatus"
        element={
          <ProtectedRoute>
            <AdminOnly>
              <ViewStatus />
            </AdminOnly>
          </ProtectedRoute>
        }
      />
      <Route
        path="/viewstoragetypes"
        element={
          <ProtectedRoute>
            <AdminOnly>
              <ViewStorageTypes />
            </AdminOnly>
          </ProtectedRoute>
        }
      />
      <Route
        path="/approvetransactions"
        element={
          <ProtectedRoute>
            <AdminOnly>
              <CartProvider>
                <ApproveTransactionPage />
              </CartProvider>
            </AdminOnly>
          </ProtectedRoute>
        }
      />
      {/* detail pages */}
      <Route path="/rooms/:roomId" element={<RoomDetails />} />
      <Route path="/categories/:categoryId" element={<CategoryDetails />} />
      <Route path="/status/:statusId" element={<StatusDetails />} />
      <Route path="/storage/:storageTypeId" element={<StorageTypeDetails />} />
    </Routes>
  );
}

export default App;
