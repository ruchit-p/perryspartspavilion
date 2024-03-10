// src/pages/CategoryDetailsPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

const CategoryDetailsPage = () => {
  const [category, setCategory] = useState(null);
  const { categoryId } = useParams(); // Get the category ID from the URL params

  useEffect(() => {
    const fetchCategory = async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('category_id', categoryId) // Use the category_id to fetch the specific category
        .single(); // Expecting only one result

      if (error) {
        console.error('Error fetching category details:', error.message);
      } else {
        setCategory(data);
      }
    };

    fetchCategory();
  }, [categoryId]);

  if (!category) {
    return <div>Loading category details...</div>;
  }

  return (
    <div className='main'>
      <div className="header">
        <h2>Category Details</h2>
      </div>
      <div><strong>Category Name:</strong> {category.category_name}</div>
      <div><strong>Description:</strong> {category.description}</div>
      {/* Add more details if needed */}
    </div>
  );
};

export default CategoryDetailsPage;
