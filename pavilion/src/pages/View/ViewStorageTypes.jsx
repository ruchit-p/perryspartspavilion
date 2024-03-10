import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient"; // Ensure this path is correct
import { Link } from "react-router-dom";

const ViewStorageTypesPage = () => {
  const [storageTypes, setStorageTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStorageTypes = async () => {
      try {
        const { data, error } = await supabase
          .from("storage_type") // Make sure this matches your actual table name
          .select("*");

        if (error) {
          throw error;
        }

        setStorageTypes(data);
      } catch (error) {
        setError("Error fetching storage types");
        console.error("Error fetching storage types:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStorageTypes();
  }, []);

  const deleteStorageType = async (storageTypeId) => {
    try {
      const { data, error } = await supabase
        .from("storage_type")
        .delete()
        .match({ storage_type_id: storageTypeId });

      if (error) {
        throw error;
      }

      setStorageTypes(storageTypes.filter((type) => type.storage_type_id !== storageTypeId));
    } catch (error) {
      console.error("Error deleting storage type:", error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="main">
      <div className="header">
        <h2>Storage Types</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th>Storage Type</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {storageTypes.map((type) => (
            <tr key={type.storage_type_id}>
              <td>
                <Link to={`/storage/${type.storage_type_id}`}>
                  {type.storage_type}
                </Link>
              </td>
              <td>{type.storage_type_description}</td>
              <td>
                <button onClick={() => deleteStorageType(type.storage_type_id)}>
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

export default ViewStorageTypesPage;
