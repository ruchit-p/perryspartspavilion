// src/pages/HomePage.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient"; // Adjust the import path if necessary
import ItemCard from "../components/ItemCard";

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase.from("items").select(`
          item_id,
          name,
          quantity,
          category: category_id (category_name),
          status: status_id (status_name)
        `); // Join with categories and status tables

      if (error) {
        console.error("Error fetching items:", error.message);
      } else {
        setItems(data);
      }
      setLoading(false);
    };

    fetchItems();
  }, []);

  if (loading) {
    return <div>Loading items...</div>;
  }

  return (
    <div className="main">
      <div className="header">
        <h2>Home</h2>
      </div>
      <div className="items-list">
        {items.map((item) => (
          <ItemCard key={item.item_id} item={item} />
          // <div key={item.item_id} className="item">
          //   <Link to={`/items/${item.item_id}`}>
          //     {/* Assuming each item has an image property */}
          //     {/* <img src={item.image} alt={item.name} style={{ width: '100%', height: 'auto' }} /> */}
          //     <h3>{item.name}</h3>
          //     {/* Add additional details as needed */}
          //     <p>{item.category.category_name}</p>
          //     <p>{item.status.status_name}</p>
          //     <p>{item.quantity}</p>
          //   </Link>
          // </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
