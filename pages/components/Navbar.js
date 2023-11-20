import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";

// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter , faFacebook, faInstagram, faSnapchat } from "@fortawesome/free-brands-svg-icons";

function Navbar()
{

    const [socialIcons, setSocialIcons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/social-icons')
          .then((response) => {
            setSocialIcons(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching social icons:', error);
            setLoading(false);
          });
    }, []);


    return (
        



            <div className="row nav-bar-container">
                <div className="col-md-5">
                    <nav className="navbar navbar-expand-lg top-navbar-second">
                    <div className="container-fluid">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            
                            <li className="nav-item"> 
                                <Link className="nav-link " href="/New">home</Link>
                            </li>
                            
                            <li className="nav-item"> 
                                <Link className="nav-link " href="/listing">listing</Link>
                            </li>

                            <li className="nav-item">
                            
                            <Link className="nav-link " href="/AboutUs">about us</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link " href="/Contact">contact</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link " href="/WorkWithUs">work with us</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link " href="/">faq</Link>
                            </li>

                        </ul>
                        </div>
                    </div></nav>
                </div>
                <div className="col-md-2 text-center mt-2">
                    <div className="good-girls-second">GOOD GIRLS</div>
                    <div className="gone-bad">GONE BAD</div>
                </div>
                <div className="col-md-5">
                    <nav className="navbar navbar-expand-lg top-navbar-second" style={{float: 'right'}}>
                    <div className="container-fluid">
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {socialIcons.map((icon) => ( 
                        
                        <Link href={icon.link} target="_blank" rel="noopener noreferrer">      
                            <li className="nav-item">
                                {/* {icon.name === 'Twitter' ? (
                                    // Render something when icon.name is 'Twitter'
                                    <FontAwesomeIcon
                                        icon={faTwitter}
                                        className="fab fa-instagram text-white"
                                    />
                                ) : null} */}
                                 {icon.name === 'Twitter' ? (
                                    <FontAwesomeIcon
                                        icon={faTwitter}
                                        className="fab fa-twitter text-dark nav-link"
                                    />
                                ) : icon.name === 'Facebook' ? (
                                    <FontAwesomeIcon
                                        icon={faFacebook}
                                        className="fab fa-facebook text-dark nav-link"
                                    />
                                ) : icon.name === 'Instagram' ? (
                                    <FontAwesomeIcon
                                        icon={faInstagram}
                                        className="fab fa-instagram text-dark nav-link"
                                    />
                                ) : icon.name === 'Snapchat' ? (
                                    <FontAwesomeIcon
                                        icon={faSnapchat}
                                        className="fab fa-snapchat text-dark nav-link"
                                    />
                                ) : null}
                            
                            </li>
                        </Link>
                        ))}
                            <li className="nav-item">
                            <a className="nav-link active" href="#">
                                <i className="fab fa-instagram" />
                            </a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link" href="#">
                                <i className="fab fa-instagram" />
                            </a>
                            </li>
                        </ul>
                        </div>
                    </div></nav>
                </div>
            </div>

        
    )
}

export default Navbar;