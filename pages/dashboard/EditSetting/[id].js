import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Admin from '@/pages/layouts/Admin';
import {toast} from 'react-toastify'

const EditSiteSetting = () => {
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState({
    title: '',
    sub_title: '',
    twitter_link: '',
    instagram_link: '',
    visa_link: '',
    mastercard_link: '',
    site_logo: null,
    background_banner: null,
  });

  useEffect(() => {
    if (id) {
      const fetchSite = async () => {
        try {
          const response = await fetch(
            `http://127.0.0.1:8000/api/setting/${id}`
          );

          if (response.ok) {
            const data = await response.json();
            setFormData(data.site);
            toast.success('Data Fetched Successfully');
          } else {
            console.error('Failed to fetch site');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      fetchSite();
    }
  }, [id]);

  const handleInputChange = (e) => {
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
      const response = await fetch(
        `http://127.0.0.1:8000/api/setting/${id}`,
        {
          method: 'PUT',
          body: formDataToSend,
        }
      );

      if (response.ok) {
        toast.success('Site Settings Updated Successfully');
      } else {
        toast.error('Failed to update site setting');
      }
    } catch (error) {
      console.error('Error Updating Site Settings:', error);
    }
  };

  return (
    <Admin>
    <div className='container-fluid my-5'>
      <h2>Edit Site Setting</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Title</label>
          <input
            type='text'
            name='title'
            value={formData.title}
            onChange={handleInputChange}
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label>Sub Title</label>
          <input
            type='text'
            name='sub_title'
            value={formData.sub_title}
            onChange={handleInputChange}
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label>Twitter Link</label>
          <input
            type='text'
            name='twitter_link'
            value={formData.twitter_link}
            onChange={handleInputChange}
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label>Instagram Link</label>
          <input
            type='text'
            name='instagram_link'
            value={formData.instagram_link}
            onChange={handleInputChange}
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label>VISA Link</label>
          <input
            type='text'
            name='visa_link'
            value={formData.visa_link}
            onChange={handleInputChange}
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label>MasterCard Link</label>
          <input
            type='text'
            name='mastercard_link'
            value={formData.mastercard_link}
            onChange={handleInputChange}
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label>Site Logo</label>
          <input
            type='file'
            name='site_logo'
            onChange={handleFileChange}
            className='form-control-file'
          />
        </div>
        {formData.site_logo && (
          <div className='form-group'>
            <label>Current Site Logo</label>
            <img
              src={formData.site_logo}
              alt='Current Site Logo'
              style={{ maxWidth: '100px' }}
            />
          </div>
        )}
        <div className='form-group'>
          <label>Background Banner</label>
          <input
            type='file'
            name='background_banner'
            onChange={handleFileChange}
            className='form-control-file'
          />
        </div>
        {formData.background_banner && (
          <div className='form-group'>
            <label>Current Background Banner</label>
            <img
              src={formData.background_banner}
              alt='Current Background Banner'
              style={{ maxWidth: '100px' }}
            />
          </div>
        )}
        <button type='submit' className='btn btn-primary' onClick={handleSubmit}>
          Save
        </button>
      </form>
    </div>
    </Admin>
  );
};

export default EditSiteSetting;
