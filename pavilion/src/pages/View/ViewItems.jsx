// src/pages/ViewItemsPage.jsx

import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { Link } from "react-router-dom";

const ViewItemsPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase
        .from("items")
        .select(
          `
          item_id,
          name,
          category_id (category_name),
          model_number,
          manufacturer,
          quantity,
          storage_type_id (storage_type),
          status_id (status_name)
        `
        ) // Adjust field names according to your table's schema
        .order("item_id", { ascending: true });

      if (error) {
        console.error("Error fetching items:", error.message);
      } else {
        setItems(data);
      }
      setLoading(false);
    };

    fetchItems();
  }, []);

  const deleteItem = async (itemId) => {
    const { data, error } = await supabase
      .from("items")
      .delete()
      .match({ item_id: itemId });

    if (error) {
      console.error("Error deleting item:", error.message);
    } else {
      setItems(items.filter((item) => item.item_id !== itemId));
    }
  };

  if (loading) {
    return <div>Loading items...</div>;
  }

  return (
    <div className="main">
      <div className="header">
        <h2>View Items</h2>
      </div>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Model Number</th>
              <th>Manufacturer</th>
              <th>Quantity</th>
              <th>Storage Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.item_id}>
                <td>
                  <Link to={`/items/${item.item_id}`}>{item.name}</Link>
                </td>
                <td>{item.category_id?.category_name}</td>
                <td>{item.model_number}</td>
                <td>{item.manufacturer}</td>
                <td>{item.quantity}</td>
                <td>{item.storage_type_id?.storage_type}</td>
                <td>{item.status_id?.status_name}</td>
                <td>
                  <button onClick={() => deleteItem(item.item_id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewItemsPage;
