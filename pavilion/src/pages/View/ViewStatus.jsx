// src/pages/ViewStatusPage.jsx

import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { Link } from "react-router-dom";

const ViewStatusPage = () => {
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatuses = async () => {
      const { data, error } = await supabase.from("status").select("*"); // Fetch all fields from the status table

      if (error) {
        console.error("Error fetching statuses:", error.message);
      } else {
        setStatuses(data);
      }
      setLoading(false);
    };

    fetchStatuses();
  }, []);

  const deleteStatus = async (statusId) => {
    const { data, error } = await supabase
      .from("status")
      .delete()
      .match({ status_id: statusId });

    if (error) {
      console.error("Error deleting status:", error.message);
    } else {
      setStatuses(statuses.filter((status) => status.status_id !== statusId));
    }
  };

  if (loading) {
    return <div>Loading statuses...</div>;
  }

  return (
    <div className="main">
      <div className="header">
        <h2>View Status</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th>Status Name</th>
            <th>Status Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {statuses.map((status) => (
            <tr key={status.status_id}>
              <td>
                <Link to={`/status/${status.status_id}`}>{status.status_name}</Link>
              </td>
              <td>{status.status_description}</td>
              <td>
                <button onClick={() => deleteStatus(status.status_id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewStatusPage;
