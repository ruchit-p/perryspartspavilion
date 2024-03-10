import React, { useState } from 'react';
import { supabase } from '../../supabaseClient'; // Ensure this path is correct

const AddStorageTypePage = () => {
  const [storageTypeData, setStorageTypeData] = useState({
    storage_type: '',
    storage_type_description: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStorageTypeData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { storage_type, storage_type_description } = storageTypeData;

    try {
      const { error } = await supabase
        .from('storage_type') // Ensure this matches your table name
        .insert([
          { storage_type, storage_type_description }
        ]);

      if (error) {
        setMessage(`Error: ${error.message}`);
        setLoading(false);
      } else {
        setMessage('Storage type added successfully!');
        // Clear the form fields
        setStorageTypeData({
          storage_type: '',
          storage_type_description: ''
        });
        setLoading(false);
      }
    } catch (error) {
      console.error('Error adding storage type:', error);
      setMessage('Error adding storage type');
      setLoading(false);
    }
  };

  return (
    <div className='main'>
        <div className="header">
            <h2>Add Storage Type</h2>
        </div>
      {message && <div>{message}</div>}
      <div className="form">

      <form className='addForm' onSubmit={handleSubmit}>
        <label className='label' htmlFor="storage_type">Storage Type:</label>
        <input
        className='input'
          type="text"
          id="storage_type"
          name="storage_type"
          value={storageTypeData.storage_type}
          onChange={handleInputChange}
          required
        />

        <label className='label' htmlFor="storage_type_description">Description:</label>
        <textarea
         className='input description'
          id="storage_type_description"
          name="storage_type_description"
          value={storageTypeData.storage_type_description}
          onChange={handleInputChange}
        />

        <button className='addBtn' type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Storage Type'}
        </button>
      </form>
      </div>
    </div>
  );
};

export default AddStorageTypePage;
