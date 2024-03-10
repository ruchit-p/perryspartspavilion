// src/pages/AddStatusPage.jsx

import React, { useState } from "react";
import { supabase } from "../../supabaseClient";

const AddStatusPage = () => {
  const [formData, setFormData] = useState({
    status_name: "",
    status_description: "",
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

    // POST request to add status to the database
    try {
      let { data, error } = await supabase
        .from("status") // Use your actual status table name
        .insert([submissionData]);

      if (error) throw error;

      alert("Status added successfully!");
      // Reset form data
      setFormData({
        status_name: "",
        status_description: "",
      });
    } catch (error) {
      console.error("Failed to add status:", error);
    }
  };

  return (
    <div className="main">
      <div className="header">
        <h2>Add New Status</h2>
      </div>
      <div className="form">
        <form className="addForm" onSubmit={handleSubmit}>
          <label className="label" htmlFor="status_name">
            Status Name:
          </label>
          <input
            className="input"
            type="text"
            id="status_name"
            name="status_name"
            value={formData.status_name}
            onChange={handleChange}
            required
          />

          <label className="label" htmlFor="status_description">
            Status Description:
          </label>
          <textarea
            className="input"
            id="status_description"
            name="status_description"
            value={formData.status_description}
            onChange={handleChange}
          />

          <button className="submitBtn" type="submit">
            Add Status
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStatusPage;
