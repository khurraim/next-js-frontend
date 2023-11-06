import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Admin from '../layouts/Admin';
import Link from 'next/link';

const FooterContentList = () => {
  const [footerContent, setFooterContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch footer content from your backend API when the component mounts
    axios.get('http://127.0.0.1:8000/api/footerContent') // Replace with your API endpoint
      .then((response) => {
        setFooterContent(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching footer content:', error);
        setLoading(false);
      });
  }, []);

  

  return (
    <Admin>
      <div className='container-fluid my-3'>
        {loading ? (
          <p>Loading footer content...</p>
        ) : footerContent.length === 0 ? (
          <p>No footer content found.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Copyright Text</th>
                <th>Footer Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {footerContent.map((content) => (
                <tr key={content.id}>
                  <td>{content.id}</td>
                  <td>{content.copyright_text}</td>
                  <td>
                    {content.footer_image && (
                      <img
                        src={`http://127.0.0.1:8000/storage/${content.footer_image}`}
                        alt="Footer Image"
                        style={{ width: '100px', height: 'auto' }}
                      />
                    )}
                  </td>
                  <td>
                    
                    <Link href={`/dashboard/EditFooterContent/${content.id}`} className="btn btn-primary">
                        Edit
                    </Link>
                    {/* <button className='btn btn-primary'>Edit</button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Admin>
  );
};

export default FooterContentList;
