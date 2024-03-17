import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { removeFromCart, getCart, updateCartQuantity } = useCart();
  const [error, setError] = useState("");
  const { dbUser } = useAuth();
  const [items, setItems] = useState([]);

  useEffect(() => {
    getCart().then((data) => {
      setCartItems(data);
    });
  }, [getCart]);

  const handleSubmit = async (cartItem, newQuantity) => {
    if (newQuantity < 1) {
      setError("Quantity must be at least 1");
      return;
    }
    try {
      const result = await updateCartQuantity(
        dbUser.user_id,
        cartItem.item_id,
        newQuantity
      );
      if (result.error) {
        setError(result.error);
      } else {
        setError(""); // clear any existing errors
        getCart().then((data) => {
          setCartItems(data);
        });
      }
    } catch (error) {
      setError("An unexpected error occurred.");
    }
  };

  const handleUpdateQuantity = async (cartItem, newQuantity) => {
    if (newQuantity < 1) {
      setError("Quantity must be at least 1");
      return;
    }
    if (newQuantity > items.quantity) {
      setError("Quantity must be less than or equal to the available quantity");
      return;
    }
  };

  const handleRemoveFromCart = async (cartItem_id, item_id) => {
    try {
      const result = await removeFromCart(cartItem_id, item_id);
      if (result.error) {
        setError(result.error);
      } else {
        setError(""); // clear any existing errors
        getCart().then((data) => {
          setCartItems(data);
        });
      }
    } catch (error) {
      getCart().then((data) => {
        setCartItems(data);
      });
    }
  };

  return (
    <>
      <div className="main">
        <div className="header">
          <h2>Your Cart</h2>
        </div>
        {error && <p className="error">{error}</p>}
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <table className="">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Change Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((cartItem) => (
                <tr className="" key={cartItem.id}>
                  <td>{cartItem.items.name}</td>
                  <td>{cartItem.quantity}</td>
                  <td>
                    <input
                      className="input"
                      type="number"
                      min="1"
                      value={cartItem.quantity}
                      onChange={(e) =>
                        handleUpdateQuantity(cartItem, parseInt(e.target.value))
                      }
                    />
                  </td>
                  <td>
                    <button
                      className="btn remove"
                      onClick={() =>
                        handleRemoveFromCart(cartItem.id, cartItem.item_id)
                      }
                    >
                      Remove
                    </button>
                    <button
                      className="btn increase"
                      onClick={() =>
                        handleUpdateQuantity(cartItem, cartItem.quantity + 1)
                      }
                    >
                      +
                    </button>
                    <button
                      className="btn decrease"
                      onClick={() =>
                        handleUpdateQuantity(cartItem, cartItem.quantity - 1)
                      }
                    >
                      -
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <Link className="checkout-button" to="/checkout">
          <button className="checkoutBtn">Request Checkout</button>
        </Link>
      </div>
    </>
  );
};

export default Cart;
