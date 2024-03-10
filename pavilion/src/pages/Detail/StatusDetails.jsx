// src/pages/StatusDetailsPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

const StatusDetailsPage = () => {
  const [status, setStatus] = useState(null);
  const { statusId } = useParams(); // Get the status ID from the URL params

  useEffect(() => {
    const fetchStatus = async () => {
      const { data, error } = await supabase
        .from('status')
        .select('*')
        .eq('status_id', statusId) // Use the status_id to fetch the specific status
        .single(); // Expecting only one result

      if (error) {
        console.error('Error fetching status details:', error.message);
      } else {
        setStatus(data);
      }
    };

    fetchStatus();
  }, [statusId]);

  if (!status) {
    return <div>Loading status details...</div>;
  }

  return (
    <div className='main'>
      <div className="header">
        <h2>Status Details</h2>
      </div>
      <h2>Status Details</h2>
      <div><strong>Status ID:</strong> {status.status_id}</div>
      <div><strong>Status Name:</strong> {status.status_name}</div>
      <div><strong>Description:</strong> {status.status_description}</div>
    </div>
  );
};

export default StatusDetailsPage;
