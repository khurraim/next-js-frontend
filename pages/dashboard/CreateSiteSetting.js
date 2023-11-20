import React, { useState } from 'react';
import Admin from '../layouts/Admin';
import { toast } from 'react-toastify';

const CreateSiteSetting = () => {
  const [formData, setFormData] = useState({
    title: '',
    sub_title: '',
    twitter_link: '',
    instagram_link: '',
    visa_link: '',
    mastercard_link: '',
    site_logo: null, // Use state for file upload
    background_banner: null, // Use state for file upload
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0], // Store the file object in state
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/setting', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        console.log('Site created successfully');
        // You can redirect or perform any other action here
        toast.success('Site Settings Created Successfully');
      } else {
        console.error('Failed to create site');
        toast.error('Failed to create site');
      }
    } catch (error) {
        
      console.error('Error:', error);
    }
  };

  return (
    <Admin>
    <div className='container-fluid my-5'>
        <div className='card'>
            <div className='card-header'>
                <h2>Create Site Setting</h2>
            </div>

            <div className='card-body'>
                <form onSubmit={handleSubmit}>

                    <div className='form-group'>
                        <div className='form-label'>Title</div>
                        <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        className='form-control'
                        value={formData.title}
                        onChange={handleChange}
                        />
                    </div>

                    <div className='form-group'>
                        <div className='form-label'>Sub Title</div>
                        <input
                        type="text"
                        name="sub_title"
                        placeholder="Sub Title"
                        className='form-control'
                        value={formData.sub_title}
                        onChange={handleChange}
                        />
                    </div>

                    <div className='form-group'>
                        <div className='form-label'>Twitter Link</div>
                        <input
                        type="text"
                        name="twitter_link"
                        placeholder="Twitter Link"
                        className='form-control'
                        value={formData.twitter_link}
                        onChange={handleChange}
                        />
                    </div>

                    <div className='form-group'>
                        <div className='form-label'>Instagram Link</div>
                        <input
                        type="text"
                        name="instagram_link"
                        placeholder="Instagram Link"
                        className='form-control'
                        value={formData.instagram_link}
                        onChange={handleChange}
                        />
                    </div>

                    <div className='form-group'>
                        <div className='form-label'>VISA Link</div>
                        <input
                        type="text"
                        name="visa_link"
                        placeholder="Visa Link"
                        className='form-control'
                        value={formData.visa_link}
                        onChange={handleChange}
                        />
                    </div>

                    <div className='form-group'>
                        <div className='form-label'>MasterCard Link</div>
                        <input
                        type="text"
                        name="mastercard_link"
                        placeholder="Mastercard Link"
                        className='form-control'
                        value={formData.mastercard_link}
                        onChange={handleChange}
                        />
                    </div>
                    
                    
                    <div className='form-group'>
                        <div className='form-label'>Site Logo</div>
                        <input
                        type="file"
                        name="site_logo"
                        className='form-control'
                        onChange={handleFileChange}
                        />
                    </div>
                    
                    <div className='form-group'>
                        <div className='form-label'>Site Banner</div>
                        <input
                        type="file"
                        name="background_banner"
                        className='form-control'
                        onChange={handleFileChange}
                        />
                    </div>

                    <button className='btn btn-primary' type="submit">Create Site</button>
                </form>
            </div>

        </div>
      
    </div>
    </Admin>
  );
};

export default CreateSiteSetting;
