// import React from "react";
// import Link from "next/link";
// import AuthUser from "./AuthUser";

// const Header = () => {

//     return (
//         <div className="header">
//             <ul>
//                 <li>
//                     <Link href='/'>Home</Link>
//                 </li>
//                 <li>
//                     <Link href='/login'>Login</Link>
//                 </li>
//                 <li>
//                     <Link href='/dashboard'>Dashboard</Link>
//                 </li>
                
//             </ul>
//         </div>
//     )
// }

// export default Header;

import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from 'axios';

const Header = () => {
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        // Fetch menus when the component mounts
        axios.get('http://127.0.0.1:8000/api/menu')
            .then((response) => {
                setMenus(response.data);
            })
            .catch((error) => {
                console.error('Error fetching menus:', error);
            });
    }, []);

    return (
        <div className="header">
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/login">Login</Link>
                </li>
                <li>
                    <Link href="/dashboard">Dashboard</Link>
                </li>
                {/* Generate navigation links for menu items */}
                {menus.map((menu) => (
                    <li key={menu.id}>
                        <Link href={`/${menu.title.replace(/\s/g, '')}`}>
                            {menu.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Header;
