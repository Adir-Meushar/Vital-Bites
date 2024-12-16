import React, { useContext, useState } from 'react';
import './navbar.css';
import './navbarButtons.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Signup from '../../authentication/signup/Signup';
import { GeneralContext } from '../../App';
import Login from '../../authentication/login/Login';
import Logout from '../../authentication/logout/Logout';
import { ImStatsDots } from "react-icons/im";
import SearchBar from '../search-bar/SearchBar';

const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');

  const navigate = useNavigate();

  const location = useLocation();

  const { user } = useContext(GeneralContext);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setClicked(false);
  };
  

  return (
    <>
    <div className='nav-container'>

  
      <nav>
        <Link to="/">
          <img
            className="logo"
            src="https://i.pinimg.com/736x/f8/47/e9/f847e9213277a801cd801e9d64dbe929.jpg"
            alt="logo"
          />
        </Link>

        <div>
          <ul id="navbar" className={clicked ? 'navbar active' : 'navbar'}>
            {/* <li>
              <Link
                to="/"
                className={activeLink === 'Home' ? 'active' : ''}
                onClick={() => handleLinkClick('Home')}
              >
                Home
              </Link>
            </li> */}
             <SearchBar/>
            {user ? (
              <>
                <div className='user-box'>
                  <Logout handleClick={handleClick} />
                  <div onClick={() => { navigate('/my-account'); handleClick(); }} className="icon icon-enter">
                    <i className="fa fa-user"></i>
                  </div>
                  {user?.role == 'admin' ?
                    <div onClick={() => { navigate('/dashboard'); handleClick(); }} className="icon icon-fill">
                      <ImStatsDots className='admin-icon' />
                    </div>
                    : ''}
                </div> 
              </>
            ) : (
              <>
                <div className='guest-box'>
                  <li><Signup /></li>
                  <li><Login /></li>
                </div>
              </>
            )}
            {/* <li>
              <Link
                to="/about"
                className={activeLink === 'About' ? 'active' : ''}
                onClick={() => handleLinkClick('About')}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={activeLink === 'Contact' ? 'active' : ''}
                onClick={() => handleLinkClick('Contact')}
              >
                Contact
              </Link>
            </li> */}
          </ul>
        </div>
        <div id="mobile" onClick={handleClick}>
          <i id="bar" className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
      </nav>
      </div>
    </>
  );
};

export default Navbar;
