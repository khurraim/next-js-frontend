// pages/dashboard/EditCategory/[id].js
import { useEffect, useState } from 'react';
import axios from 'axios';
import Admin from '@/pages/layouts/Admin';
import { toast } from 'react-toastify';

function EditCategory({ category }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(category.name || '');
    setDescription(category.description || '');
  }, [category]);

  const handleEdit = () => {
    // Make a PUT request to update the category
    axios.put(`http://127.0.0.1:8000/api/categories/${category.id}`, {
      name,
      description,
    })
    .then(() => {
      // Handle success
      toast.success("Category Updated Successfully");
    })
    .catch((error) => {
      console.error('Error updating category:', error);
    });
  };

  return (
    <Admin>
      <div className="container-fluid my-5">
        <div className='card'>
            <div className='card-header'>
                <h2 className='text-center'>Edit Category</h2>
            </div>
            <div className='card-body'>
                <form>
                    
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                        type="text"
                        className='form-control'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Description:</label>
                        <textarea
                        className='form-control'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>

                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleEdit}
                    >
                        Save Changes
                    </button>

                </form>
            </div>
        </div>

        {/* <h1>Edit Category</h1>
        <form>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleEdit}
          >
            Save Changes
          </button>
        </form> */}
      </div> 
    </Admin>
  );
}

EditCategory.getInitialProps = async ({ query }) => {
  const { id } = query;

  // Fetch the category data based on the ID from the API
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/categories/${id}`);
    const category = response.data;
    return { category };
  } catch (error) {
    console.error('Error fetching category:', error);
    return { category: {} };
  }
};

export default EditCategory;
