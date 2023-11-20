import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Admin from '../layouts/Admin';
import {toast} from 'react-toastify';
import Link from 'next/link';

const FormGroup = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios.get('http://127.0.0.1:8000/api/form-groups')
      .then((response) => {
        setGroups(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDelete = (id) => {
    // Make a DELETE request to delete the category with the specified ID
    axios.delete(`http://127.0.0.1:8000/api/form-groups/${id}`)
      .then(() => {
        // If the delete request is successful, update the categories state
        setGroups((prevGroups) => prevGroups.filter((group) => group.id !== id));
        toast.success("Group Deleted Successfully");
      })
      .catch((error) => {
        console.error('Error deleting Group:', error);
        toast.error("Error Deleting Group");
      });
  };

  return (
    <Admin>
        <div className='container-fluid my-5'>
            <table className="table table-bordered">
                <thead>
                    <tr>
                    <th>Title</th>
                    <th>Subtitle</th>
                    <th>Image</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {groups.map((group) => (
                    <tr key={group.id}>
                        <td>{group.title}</td>
                        <td>{group.subtitle}</td>
                        <td>
                        {group.image && (
                            <img
                            src={`http://127.0.0.1:8000/storage/${group.image}`}
                            alt="Group Image"
                            style={{ maxWidth: '100px', height: 'auto' }}
                            />
                        )}
                        </td>
                        <td>
                            
                            <Link href={`/dashboard/EditHeroSection/${group.id}`} className="btn btn-primary mx-3">
                                Edit
                            </Link> 
                            <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(group.id)} // Call handleDelete on click
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
};

export default FormGroup;
