// src/pages/ItemDetailsPage.jsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import QuantityHandler from "../../components/QuantityHandler";

const ItemDetailsPage = () => {
  const [item, setItem] = useState(null);
  const { itemId } = useParams(); // Get the item ID from the URL params
  const [quantity, setQuantity] = useState(null);
  const { addToCart } = useCart();

  const { dbUser } = useAuth();

  useEffect(() => {
    const fetchItem = async () => {
      const { data, error } = await supabase
        .from("items")
        .select(
          ` item_id,
        name,
        quantity,
        category: category_id (category_name),
        status: status_id (status_name)`
        )
        .eq("item_id", itemId) // Use the item_id to fetch the specific item
        .single(); // Expecting only one result

      if (error) {
        console.error("Error fetching item details:", error.message);
      } else {
        setItem(data);
      }
    };

    fetchItem();
  }, [itemId]);

  if (!item) {
    return <div>Loading item details...</div>;
  }

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (quantity <= 0) {
      alert("Please enter a valid quantity");
      return;
    }
    if (quantity > item.quantity) {
      alert("Quantity exceeds available stock");
      return;
    }
    try {
      const result = await addToCart({
        item_id: item.item_id,
        quantity: parseInt(quantity),
        user_id: dbUser.user_id,
      });
      if (result.error) {
        console.error("Error adding item to cart:", result.error);
        alert(
          result.error || "An unexpected error occurred. Please try again."
        );
        // Handle error here, e.g., show an error message
      } else {
        setQuantity(0); // Reset quantity after successful add to cart
        alert("Item added to cart");
        // Handle success here, e.g., show a success message
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      // Handle the exception here
    }
  };

  const setNewQuantity = (newQuantity) => {
    // set the quantity in supabase for the items table for the specific item
    // then use this function in the QuantityHandler component
  };

  console.log("item: ", item);

  return (
    <div className="main">
      <div className="header">
        <h2>Item Details</h2>
      </div>
      <div className="details">
        <h4>
          Name: <span className="info">{item.name}</span>
        </h4>
        <h4>
          Category: <span className="info">{item.category.category_name}</span>
        </h4>
        <h4>
          Model Number: <span className="info">{item.model_number}</span>
        </h4>
        <h4>
          Manufacturer: <span className="info">{item.manufacturer}</span>
        </h4>
        <h4>
          Quantity: <span className="info">{item.quantity}</span>
          {/* add increase, decrease, and text field to change quantity */}
          <QuantityHandler
            item={item}
            setQuantity={setNewQuantity}
          ></QuantityHandler>
        </h4>
        <h4>
          Storage Type: <span className="info">{item.storage_type}</span>
        </h4>
        <h4>
          Status: <span className="info">{item.status.status_name}</span>
        </h4>
        <h4>
          Time Added: <span className="info">{item.time_added_at}</span>
        </h4>

        <div className="actions">
          <form onSubmit={handleAddToCart}>
            <h4 className="addCart">Add to cart</h4>
            <label className="label" htmlFor="quantity">
              Quantity:
            </label>
            <input
              id="quantity"
              className="input quantityInput"
              type="number"
              placeholder="quantity"
              value={quantity}
              required
              onChange={handleQuantityChange}
            />
            <button className="submitBtn btn btn-primary" type="submit">
              Add to cart
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsPage;
