// src/pages/AddItemPage.jsx

import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { Link } from "react-router-dom";

const AddItemPage = () => {
  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [storageTypes, setStorageTypes] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category_id: null,
    model_number: "",
    manufacturer: "",
    quantity: 1,
    storage_type_id: null, // Default to "individual" as an example
    status_id: null, // Default to "available" as an example
  });

  useEffect(() => {
    // Fetch categories when the component mounts
    const fetchData = async () => {
      // Fetch categories
      let { data: categoriesData, error: categoriesError } = await supabase
        .from("categories")
        .select("category_id, category_name");
      if (categoriesError) {
        console.error("Error fetching categories:", categoriesError);
      } else {
        setCategories(categoriesData);
      }

      // Fetch statuses
      let { data: statusesData, error: statusesError } = await supabase
        .from("status")
        .select("status_id, status_name");
      if (statusesError) {
        console.error("Error fetching statuses:", statusesError);
      } else {
        setStatuses(statusesData);
      }

      // Fetch storage types
      let { data: storageTypesData, error: storageTypesError } = await supabase
        .from("storage_type")
        .select("storage_type_id, storage_type");
      if (storageTypesError) {
        console.error("Error fetching storage types:", storageTypesError);
      } else {
        setStorageTypes(storageTypesData);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let submissionData = {
      ...formData,
    };

    // POST request to add item to the database
    try {
      let { data, error } = await supabase
        .from("items") // Replace 'items' with the actual table name
        .insert([submissionData]);

      if (error) throw error;

      alert("Item added successfully!");
      setFormData({
        name: "",
        category_id: null,
        model_number: "",
        manufacturer: "",
        quantity: 1,
        storage_type: "individual",
        status_id: null,
      });
      // Handle success, clear form or redirect user
    } catch (error) {
      console.error("Failed to add item:", error);
      // Handle errors, possibly show an error message to the user
    }
  };

  return (
    <div className="main">
      <div className="header">
        <h2>Add New Item</h2>
      </div>
      <div className="form">
        <form className="addForm" onSubmit={handleSubmit}>
          <label className="label" htmlFor="name">
            Name:
          </label>
          <input
            className="input"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label className="label" htmlFor="category_id">
            Category:
          </label>
          <select
            className="select"
            id="category_id"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.category_name}
              </option>
            ))}
          </select>
          <button className="addBtn">
            <Link to="/addcategories">Add New Category</Link>
          </button>

          <label className="label" htmlFor="model_number">
            Model Number:
          </label>
          <input
            className="input"
            type="text"
            id="model_number"
            name="model_number"
            value={formData.model_number}
            onChange={handleChange}
          />

          <label className="label" htmlFor="manufacturer">
            Manufacturer:
          </label>
          <input
            className="input"
            type="text"
            id="manufacturer"
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleChange}
          />

          <label className="label" htmlFor="quantity">
            Quantity:
          </label>
          <input
            className="input"
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />

          <label className="label" htmlFor="storage_type_id">
            Storage Type:
          </label>
          <select
            className="select"
            id="storage_type_id"
            name="storage_type_id"
            value={formData.storage_type_id}
            onChange={handleChange}
            required
          >
            <option value="">Select a storage type</option>
            {storageTypes.map((type) => (
              <option key={type.storage_type_id} value={type.storage_type_id}>
                {type.storage_type}
              </option>
            ))}
          </select>
          <button className="addBtn">
            <Link to="/addstoragetype">Add New Storage Type</Link>
          </button>

          <label className="label" htmlFor="status_id">
            Status:
          </label>
          <select
            className="select"
            id="status_id"
            name="status_id"
            value={formData.status_id}
            onChange={handleChange}
            required
            aria-placeholder="Select a status"
          >
            <option disabled selected value="">
              Select a status
            </option>
            {statuses.map((status) => (
              <option key={status.status_id} value={status.status_id}>
                {status.status_name}
              </option>
            ))}
          </select>
          <button className="addBtn">
            <Link to="/addstatus">Add New Status</Link>
          </button>

          <button className="submitBtn" type="submit" onClick={handleSubmit}>
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItemPage;
