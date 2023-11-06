import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Admin from '../layouts/Admin';
import { toast } from 'react-toastify';

function ViewCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Make a GET request to your Laravel API endpoint to fetch the categories
    axios.get('http://127.0.0.1:8000/api/categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleDelete = (id) => {
    // Make a DELETE request to delete the category with the specified ID
    axios.delete(`http://127.0.0.1:8000/api/categories/${id}`)
      .then(() => {
        // If the delete request is successful, update the categories state
        setCategories((prevCategories) => prevCategories.filter((category) => category.id !== id));
        toast.success("Category Deleted Successfully");
      })
      .catch((error) => {
        console.error('Error deleting category:', error);
        toast.error("Error Deleting Category");
      });
  };

  return (
    <Admin>
      <div className="container-fluid my-5">
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>
                <Link href={`/dashboard/EditCategory/${category.id}`} className="btn btn-primary mx-3">
                  Edit
                </Link>

                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(category.id)} // Call handleDelete on click
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Admin>
  );
}

export default ViewCategories;
