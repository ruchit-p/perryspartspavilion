// src/pages/AddCategoryPage.jsx

import React, { useState } from "react";
import { supabase } from "../../supabaseClient";

const AddCategoryPage = () => {
  const [formData, setFormData] = useState({
    category_name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let submissionData = {
      ...formData,
    };

    // POST request to add category to the database
    try {
      let { data, error } = await supabase
        .from("categories") // Adjust if your table name is different
        .insert([submissionData]);

      if (error) throw error;

      alert("Category added successfully!");
      // Reset form data
      setFormData({
        category_name: "",
        description: "",
      });
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };

  return (
    <div className="main">
      <div className="header">
        <h2>Add New Category</h2>
      </div>
      <div className="form">
        <form className="addForm" onSubmit={handleSubmit}>
          <label className="label" htmlFor="category_name">
            Category Name:
          </label>
          <input
            className="input"
            type="text"
            id="category_name"
            name="category_name"
            value={formData.category_name}
            onChange={handleChange}
            required
          />

          <label className="label" htmlFor="description">
            Description (optional):
          </label>
          <textarea
            className="input description"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <button className="submitBtn" type="submit">
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryPage;
