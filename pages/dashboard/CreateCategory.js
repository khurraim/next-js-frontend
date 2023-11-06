import React, { useState } from 'react';
import axios from 'axios';
import Admin from '../layouts/Admin';
import { toast } from 'react-toastify';

function CreateCategory() {

  const [category, setCategory] = useState({
    name: '',
    description: '', // Add the description field
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/categories', category);

      // Handle successful response here (e.g., show a success message).
      console.log('Category created successfully:', response.data);
      toast.success('Category Added Successfully');

      // Reset the form
      setCategory({ name: '', description: '' });
    } catch (error) {
      // Handle errors (e.g., display an error message).
      console.error('Error:', error);
      toast.error('Error Adding Category');
    }
  };

  return (
    <Admin>
      <div className='container-fluid py-5'>
        <div className='card'>
          <div className='card-header'>
            <h2 className='text-center'>Create New Category</h2>
          </div>
          <div className='card-body'>
            <form onSubmit={handleSubmit}>
              
              <div className='form-group'>
                <label className='form-label'>Category Name:</label>
                <input
                  className='form-control'
                  type='text'
                  name='name'
                  value={category.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className='form-group'>
                <label className='form-label'>Category Description:</label>
                <textarea
                    className='form-control'
                    name='description'
                    value={category.description}
                    onChange={handleInputChange}
                    required
                />
              </div>

              <button className='btn btn-large my-3 w-100 btn-primary' type='submit'>
                Create Category
              </button>
            </form>
          </div>
        </div>
      </div>
    </Admin>
  );
}

export default CreateCategory;
