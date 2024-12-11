import { Link } from 'react-router-dom';
import './footer.css'
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo and Site Name */}
        <div className="footer-logo">
          <h2>Vital Bites</h2>
          <p>Your gateway to healthy and delicious recipes.</p>
        </div>

        {/* Navigation Links */}
        <nav className="footer-nav">
          <ul className="footer-links">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms-of-service">Terms of Service</Link></li>
          </ul>
        </nav>

        {/* Social Media Links */}
        <div className="footer-social">
          <Link to="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></Link>
          <Link to="#" aria-label="Twitter"><i className="fab fa-twitter"></i></Link>
          <Link to="#" aria-label="Instagram"><i className="fab fa-instagram"></i></Link>
          <Link to="#" aria-label="YouTube"><i className="fab fa-youtube"></i></Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Vital Bites. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
