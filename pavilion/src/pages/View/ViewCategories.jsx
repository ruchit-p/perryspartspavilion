// src/pages/ViewCategoriesPage.jsx

import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { Link } from 'react-router-dom';

const ViewCategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*'); // Fetch all fields from the categories table

      if (error) {
        console.error('Error fetching categories:', error.message);
      } else {
        setCategories(data);
      }
      setLoading(false);
    };

    fetchCategories();
  }, []);

  const deleteCategory = async (categoryId) => {
    const { data, error } = await supabase
      .from('categories')
      .delete()
      .match({ category_id: categoryId });

    if (error) {
      console.error('Error deleting category:', error.message);
    } else {
      setCategories(categories.filter((category) => category.category_id !== categoryId));
    }
  };

  if (loading) {
    return <div>Loading categories...</div>;
  }

  return (
    <div className='main'>
      <div className='header'>
        <h2>View Categories</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.category_id}>
              <td>
                <Link to={`/categories/${category.category_id}`}>
                {category.category_name}
                </Link>
                </td>
              <td>{category.description}</td>
              <td>
                <button onClick={() => deleteCategory(category.category_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewCategoriesPage;
