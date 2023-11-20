import React, { useState, useEffect } from 'react';
import Admin from '../layouts/Admin';
import Link from 'next/link';

const ViewSiteSettings = () => {
  const [sites, setSites] = useState([]);

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/setting'); // Replace with your API endpoint
        if (response.ok) {
          const data = await response.json();
          setSites(data.sites);
        } else {
          console.error('Failed to fetch sites');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchSites();
  }, []);

  return (
    <Admin>
      <div className='container-fluid my-5'>
        <h2>Site List</h2>
        <table className='table table-striped table-bordered'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Sub Title</th>
              <th>Twitter Link</th>
              <th>Instagram Link</th>
              <th>VISA Link</th>
              <th>MasterCard Link</th>
              <th>Site Logo</th>
              <th>Background Banner</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sites.map((site) => (
              <tr key={site.id}>
                <td>{site.title}</td>
                <td>{site.sub_title}</td>
                <td>{site.twitter_link}</td>
                <td>{site.instagram_link}</td>
                <td>{site.visa_link}</td>
                <td>{site.mastercard_link}</td>
                <td>
                  <img
                    src={site.site_logo}
                    alt="Site Logo"
                    style={{ maxWidth: '100px' }}
                  />
                </td>
                <td>
                  <img
                    src={site.background_banner}
                    alt="Background Banner"
                    style={{ maxWidth: '100px' }}
                  />
                </td>
                <td>
                    <Link href={`/dashboard/EditSetting/${site.id}`} className="btn btn-primary mx-3">
                        <button className='btn btn-primary'>Edit</button>
                    </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Admin>
  );
};

export default ViewSiteSettings;
