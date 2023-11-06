import React, { useState } from 'react';
import axios from 'axios';
import Layout from './layouts/Layout';
import {toast} from 'react-toastify';

function Contact() {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone_no: '',
    message: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to your Laravel API endpoint to save the contact
      const response = await axios.post('http://127.0.0.1:8000/api/contacts', contact);
      console.log('Contact stored:', response.data);
      
      // Success Message
      toast.success('Message Sent Successfully');

      // Reset The Form
     setContact({name:'',email:'',phone_no:'',message:''});

    } catch (error) {
      console.error('Error storing contact:', error);
      // Optionally, handle errors
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  return (
    <Layout>
      <div className='container my-5'>
        <div className='card'>
          <div className='card-header'>
            <h3 className='text-left'>Contact Us</h3>
          </div>
          <div className='card-body'>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label className='form-label'>Name : </label>
                <input
                  type='text'
                  className='form-control'
                  name='name'
                  value={contact.name}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label className='form-label'>Email : </label>
                <input
                  type='email'
                  className='form-control'
                  name='email'
                  value={contact.email}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label className='form-label'>Phone No : </label>
                <input
                  type='number'
                  className='form-control'
                  name='phone_no'
                  value={contact.phone_no}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label className='form-label'>Message : </label>
                <textarea
                  className='form-control'
                  name='message'
                  value={contact.message}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group my-3'>
                <input type='submit' className='btn btn-large btn-primary' />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Contact;
