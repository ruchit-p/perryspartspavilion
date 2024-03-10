// src/pages/AddRoomPage.jsx

import React, { useState } from "react";
import { supabase } from "../../supabaseClient";

const AddRoomPage = () => {
  const [formData, setFormData] = useState({
    building_name: "",
    room_number: "",
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

    // POST request to add room to the database
    try {
      let { data, error } = await supabase
        .from("rooms") // Adjust if your table name is different
        .insert([submissionData]);

      if (error) throw error;
      alert("Room added successfully!");
      // Reset form data
      setFormData({
        building_name: "",
        room_number: "",
      });
    } catch (error) {
      console.error("Failed to add room:", error);
    }
  };

  return (
    <div className="main">
      <div className="header">
        <h2>Add New Room</h2>
      </div>
      <div className="form">
        <form className="addForm" onSubmit={handleSubmit}>
          <label className="label" htmlFor="building_name">
            Building Name:
          </label>
          <input
            className="input"
            type="text"
            id="building_name"
            name="building_name"
            value={formData.building_name}
            onChange={handleChange}
            required
          />

          <label className="label" htmlFor="room_number">
            Room Number:
          </label>
          <input
            className="input"
            type="text"
            id="room_number"
            name="room_number"
            value={formData.room_number}
            onChange={handleChange}
            required
          />

          <button className="submitBtn" type="submit">
            Add Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRoomPage;
