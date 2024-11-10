import { Link } from "react-router-dom";
import "./index.css";

const Navbar = () => {
  return (
    <div className="navbar-bg-cont">
      <Link to="/" className="website-name-link">
        <h1 className="website-name">Brisphere</h1>
      </Link>
      <div className="navbar-sections">
        <p>Discover</p>
        <p>Services</p>
        <p>About Us</p>
      </div>
    </div>
  );
};

export default Navbar;
