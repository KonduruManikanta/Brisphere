import { useContext } from "react";
import "./index.css";
import { AppContext } from "../../context/AppContext";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const { state } = useContext(AppContext);
  const { isOrderPlaced } = state;

  //accessing current path here for show terms and conditions in only booking component.
  const location = useLocation();
  const path = location.pathname;
  return (
    <div className="footer-bg-container">
      <div>
        <h2 className="footer-website-name">MK Travels</h2>
        <p>Spituk, Ladakh,</p>
        <p>India, 194101</p>
        <p>+91 - 7764997033</p>
        <p>amit.jha6700@gmail.com</p>
        <button className="location-btn">Location</button>
      </div>
      {!isOrderPlaced && path === "/booking" && (
        <p className="terms-conditions-text">
          terms and conditions privacy policy refunds
        </p>
      )}
    </div>
  );
};
export default Footer;
