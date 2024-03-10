import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { supabase } from "../supabaseClient";

const CheckoutPage = () => {
  const [checkoutItems, setCheckoutItems] = useState([]);
  const { dbUser } = useAuth();
  const { cart, getCart } = useCart();

  useEffect(() => {
    const fetchCart = async () => {
      const cartData = await getCart();
      if (cartData) {
        setCheckoutItems(cartData);
      }
    };
    fetchCart();
  }, [getCart]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Start a batch operation for the checkout requests
    let batchRequest = [];

    for (const item of checkoutItems) {
      batchRequest.push(
        supabase.from("checkout_request").insert([
          {
            user_id: dbUser.user_id,
            item_id: item.item_id,
            quantity: item.quantity,
          },
        ])
      );
    }

    // Execute all checkout requests
    const checkoutPromises = await Promise.all(batchRequest);
    const checkoutErrors = checkoutPromises.filter((result) => result.error);

    if (checkoutErrors.length > 0) {
      // Handle the error, e.g., show a message to the user
      console.error("Error during checkout process:", checkoutErrors);
    } else {
      // If checkout is successful, clear the cart
      const { error: clearError } = await supabase
        .from("cart")
        .delete()
        .match({ user_id: dbUser.user_id });

      if (clearError) {
        // Handle the error, e.g., show a message to the user
        console.error("Error clearing the cart:", clearError);
      } else {
        // Successfully cleared the cart
        setCheckoutItems([]); // Update local state to reflect the cleared cart
        console.log("Checkout successful, cart cleared.");
        // Optionally, navigate the user to a success page or update the UI
      }
    }
  };

  return (
    <div className="checkout-page">
      <div className="header">
        <h2>Checkout</h2>
      </div>
      {checkoutItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table className="cart-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Item ID</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {checkoutItems.map((item) => (
              <tr key={item.item_id}>
                <td>{item.items.name}</td>
                <td>{item.item_id}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={handleSubmit} className="checkoutBtn">
        Request Approval
      </button>
    </div>
  );
};

export default CheckoutPage;
