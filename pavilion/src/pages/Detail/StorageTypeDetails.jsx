import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../supabaseClient'; // Ensure this path is correct

const ViewStorageTypeDetailsPage = () => {
  const [storageType, setStorageType] = useState(null);
  const { storageTypeId } = useParams(); // Get the storage type ID from the URL params

  useEffect(() => {
    const fetchStorageType = async () => {
      const { data, error } = await supabase
        .from('storage_type') // Make sure this matches your table name
        .select('*')
        .eq('storage_type_id', storageTypeId) // Use the storage_type_id to fetch the specific storage type
        .single(); // Expecting only one result

      if (error) {
        console.error('Error fetching storage type details:', error.message);
      } else {
        setStorageType(data);
      }
    };

    fetchStorageType();
  }, [storageTypeId]);

  if (!storageType) {
    return <div>Loading storage type details...</div>;
  }

  return (
    <div className='main'>
      <div className="header">
        <h2>Storage Type Details</h2>
      </div>
      <div>ID: {storageType.storage_type_id}</div>
      <div>Created At: {storageType.created_at}</div>
      <div>Storage Type: {storageType.storage_type}</div>
      <div>Description: {storageType.storage_type_description}</div>
      {/* Add more details as needed */}
    </div>
  );
};

export default ViewStorageTypeDetailsPage;
