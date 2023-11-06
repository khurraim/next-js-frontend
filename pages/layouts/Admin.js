import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AuthUser from '../components/AuthUser';
import NavbarDropdown from '../components/NavbarDropdown';


// Newly Added


//import UserDropdown from '../components/UserDropdown';

// const handleLogout = () => {
//   sessionStorage.clear();
//   router.push('/login');
// }

const links = [
  { label: 'View Models', url: '/dashboard/ViewModels' },
  { label: 'Create Model', url: '/dashboard/CreateModel' },
];

const pagesLink = [
  { label: 'View Pages', url: '/dashboard/ViewPages' },
  { label: 'Create Pages', url: '/dashboard/CreatePage' },
];



const NavigationMenu = [
  { label: 'View Menu', url: '/dashboard/ViewMenu' },
  { label: 'Create/Edit Menu', url: '/dashboard/AddToMenu' },
];

const footerMenu = [
  { label: 'View Footer Menu', url: '/dashboard/ViewFooterMenu' },
  { label: 'Create/Edit Footer Menu', url: '/dashboard/AddToFooterMenu' },
];

const footerContent = [
  { label: 'Footer Content', url: '/dashboard/ViewFooterContent' },
  //{ label: 'Create Footer Content', url: '/dashboard/CreateFooterContent' },
];

const HeroSection = [
  { label: 'Create Hero Section', url: '/dashboard/CreateHeroSection' },
  { label: 'View Hero Section', url: '/dashboard/ViewHeroSection' }
]

const SocialIconsSection = [
  { label: 'Add Social Icons', url: '/dashboard/AddSocialIcons' },
  { label: 'View Social Icons', url: '/dashboard/ViewSocialIcons' }
]

const ContactMenu = [
  { label: 'ViewMessages', url: '/dashboard/ViewMessages' },
]





const Admin = ({ children }) => {



  const {token} = AuthUser();
  const router = useRouter();

  // useEffect hook for authentication
  useEffect(()=> {
    if(token === null)
    {
      router.push('/login');
    } 
  }, [token]);

    const logout = () => {
        sessionStorage.clear();
        router.push('/login');
    }

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Function to toggle the dropdown
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };

    // Function to close the dropdown
    const closeDropdown = () => {
      setIsDropdownOpen(false);
    };



  return (
    <>
        
        <div className="dashboard-main-wrapper">
  {/* navbar */}
  <div className="dashboard-header">
    <nav className="navbar navbar-expand-lg bg-white fixed-top">
      <a className="navbar-brand" href="/dashboard">Concept</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse " id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto navbar-right-top">


          {/* <li className="nav-item">
            <div id="custom-search" className="top-search-bar">
              <input className="form-control" type="text" placeholder="Search.." />
            </div>
          </li> */}
          

          <li className={`nav-item dropdown nav-user ${isDropdownOpen ? 'show' : ''}`}>
            <a
              className="nav-link nav-user-img"
              href="#"
              id="customDropdown"
              onClick={toggleDropdown}
            >
              <img src="/images/avatar-1.jpg" alt="" className="user-avatar-md rounded-circle" />
            </a>
            {isDropdownOpen && (
              <div className="dropdown-menu dropdown-menu-right nav-user-dropdown show">
                <div className="nav-user-info">
                  <h5 className="mb-0 text-white nav-user-name">James Howlett</h5>
                </div>
                <a className="dropdown-item" href="#"><i className="fas fa-user mr-2"></i>Account</a>
                <a className="dropdown-item" href="#"><i className="fas fa-cog mr-2"></i>Setting</a>
                <a className="dropdown-item" onClick={() => logout()}><i className="fas fa-power-off mr-2"></i>Logout</a>
              </div>
            )}
            {/* Close the dropdown when clicking outside */}
            {isDropdownOpen && (
              <div className="dropdown-backdrop" onClick={closeDropdown}></div>
            )}
          </li>


        </ul>
      </div>
    </nav>
  </div>
  {/* end navbar */}
  {/* left sidebar */}
  <div className="nav-left-sidebar sidebar-dark">
    <div className="slimScrollDiv" style={{position: 'relative', overflow: 'hidden', width: 'auto', height: '100%'}}><div className="menu-list" style={{overflow: 'hidden', width: 'auto', height: '100%'}}>
        <nav className="navbar navbar-expand-lg navbar-light">
          <a className="d-xl-none d-lg-none" href="#">Dashboard</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav flex-column">
              <li className="nav-divider">
                Menu
              </li>

              <NavbarDropdown title="Models" links={links} />
              
              <li className='nav-divider'>
                Pages & Menus
              </li>

              <NavbarDropdown title="Pages" links={pagesLink} />

              <li className='nav-divider'>
                Site Identity & HomePage
              </li>

              
              <NavbarDropdown title="Navigation Menu" links={NavigationMenu} />

              <NavbarDropdown title="Hero Section" links={HeroSection} />

              <NavbarDropdown title="Social Icons" links={SocialIconsSection} />
              
              <li className='nav-divider'>
                Messages
              </li>

              <NavbarDropdown title="Contact Form" links={ContactMenu} />


              <li className='nav-divider'>
                Footer
              </li>

              <NavbarDropdown title="Footer Menu" links={footerMenu} />
              <NavbarDropdown title="Footer Content" links={footerContent} />

              

            </ul>
          </div>

          

        </nav>
      </div><div className="slimScrollBar" style={{background: 'rgb(0, 0, 0)', width: 7, position: 'absolute', top: 0, opacity: '0.4', display: 'none', borderRadius: 7, zIndex: 99, right: 1, height: 1730}} /><div className="slimScrollRail" style={{width: 7, height: '100%', position: 'absolute', top: 0, display: 'none', borderRadius: 7, background: 'rgb(51, 51, 51)', opacity: '0.2', zIndex: 90, right: 1}} /></div>
  </div>
  {/* end left sidebar */}
  {/* wrapper  */}
  <div className="dashboard-wrapper">
    <div className="dashboard-ecommerce">
    {children}
    </div>
    
  </div>
</div>

    </>

      
  );
};

export default Admin;
