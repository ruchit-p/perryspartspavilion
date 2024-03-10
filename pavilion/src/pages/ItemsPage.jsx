// src/pages/ItemsPage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // Adjust the import path if necessary
import ItemCard from '../components/ItemCard';

const ItemsPage = () => {
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
    return <div className='home'>Loading items...</div>;
  }

  return (
    <div className="main">
      <div className="header">
        <h2>Items</h2>
      </div>
      <div className="items-list">
        {items.map((item) => (
          <ItemCard key={item.item_id} item={item} />
          // <div key={item.item_id} className="item">
          //   <h3>{item.name}</h3>
          //   <p>Category: {item.category}</p>
          //   <p>Quantity: {item.quantity}</p>
          //   <p>Status: {item.status}</p>
          //   <Link to={`/items/${item.item_id}`}>View Details</Link>
          // </div>
        ))}
      </div>
    </div>
  );
};

export default ItemsPage;
