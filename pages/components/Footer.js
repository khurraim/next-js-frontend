import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from 'axios';

const Footer = () => {
    const [menus, setMenus] = useState([]);
    const [pages, setPages] = useState({});

    useEffect(() => {
        // Fetch menus when the component mounts
        axios.get('http://127.0.0.1:8000/api/footer')
            .then((response) => {
                setMenus(response.data);

                // Extract unique page IDs from menu items
                const pageIds = [...new Set(response.data.map(menu => menu.page_id))];

                // Fetch page titles for all unique page IDs
                pageIds.forEach(pageId => {
                    axios.get(`http://127.0.0.1:8000/api/pages/${pageId}`)
                        .then((pageResponse) => {
                            // Store page titles in the 'pages' state using page ID as the key
                            setPages(prevPages => ({
                                ...prevPages,
                                [pageId]: pageResponse.data.title,
                            }));
                        })
                        .catch((error) => {
                            console.error('Error fetching page:', error);
                        });
                });
            })
            .catch((error) => {
                console.error('Error fetching menus:', error);
            });
    }, []);

    return (
        <div className="header">
            <ul>
                {/* Generate navigation links for menu items */}
                {menus.map((menu) => (
                    <li key={menu.id}>
                        <Link href={`/${pages[menu.page_id]?.replace(/\s/g, '')}`}>
                            {menu.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Footer;
